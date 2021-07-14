import { Injectable } from '@angular/core';
import { lex as yazurLex, generateSpans as yazurGenerateSpans } from '../../../yazur/es-modules/yolol/lex';
import yazurClaim from '../../../yazur/es-modules/yolol/parse';
import yazurInterpret from '../../../yazur/es-modules/yolol/interpret';
import { BehaviorSubject, interval } from 'rxjs';
import { NetworkManagerService, Network } from './network-manager.service';

@Injectable({
  providedIn: 'root'
})
export class YazurService {
  chipTimer = interval( 200 );

  constructor() { }
}

export class Chip {

  yololBuffered = true;
  parsed = [];
  localEnv = {
    chipwaitField: ':chipwait',
    global: {
      ':chipwait': { type: 3, subtype: 1, value: 0 }
    },
    nextBroadcast: {},
    nextLine: 1,
    vars: {}
  };
  network: Network;

  lineChange: BehaviorSubject<{ nextLine: number }> = new BehaviorSubject( { nextLine: this.localEnv.nextLine } );

  constructor( prefill?: string[], network?: { networkManagerService: NetworkManagerService, networkName: string } )  {
    if ( network ) {
      this.network = network.networkManagerService.openNetwork( network.networkName );
      this.network.values.subscribe( val => {
        delete val[':chipwait'];
        this.localEnv.global = { ...this.localEnv.global, ...val };
      } );
    }

    const parsed = [];
    if ( prefill ) {
      prefill.forEach( line => {
        parsed.push( this.parse( this.lex( line ) ) );
      } );
    }
    this.setParsed( parsed );
  }

  setCurrentLine( nextLine: number ): any {
    this.localEnv.nextLine = nextLine;
    this.lineChange.next( { nextLine } );
  }

  lex( line: string, lineNumber = 1 ): any {
    return yazurLex( line, lineNumber );
  }

  parse( lexed: any ): any {
    return yazurClaim( lexed );
  }

  generateSpans( line: string, lexed: any[] ): any {
    return yazurGenerateSpans( line, lexed );
  }

  setParsed( parsed: any[][] ): any {
    this.parsed = parsed;
  }

  interpret(): any {
    const chipwait = this.localEnv.global[this.localEnv.chipwaitField].value;
    if (chipwait >= 0 && chipwait < 1){
      yazurInterpret( this );
    } else if (chipwait >= 1){
      this.localEnv.global[this.localEnv.chipwaitField].value -= 1;
    }

    this.network.pushValue( { ...this.localEnv.global } );
    this.lineChange.next( { nextLine: this.localEnv.nextLine } );
  }

}
