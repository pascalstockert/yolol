import { Injectable } from '@angular/core';
import yazurLex from '../../../yazur/es-modules/yolol/lex';
import yazurClaim  from '../../../yazur/es-modules/yolol/parse';
import yazurInterpret from '../../../yazur/es-modules/yolol/interpret';
import { BehaviorSubject, interval } from 'rxjs';

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

  lineChange: BehaviorSubject<{ nextLine: number }> = new BehaviorSubject( { nextLine: this.localEnv.nextLine } );

  constructor( prefill?: string[] )  {
    const parsed = [];
    if ( !!prefill ) {
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

  setParsed( parsed: any[][] ): any {
    this.parsed = parsed;
  }

  interpret(): any {

    const chipwait=this.localEnv.global[this.localEnv.chipwaitField].value;
    if(chipwait>=0 && chipwait<1){
      yazurInterpret( this );
    } else {
      this.localEnv.global[this.localEnv.chipwaitField].value-=1;
    }

    this.lineChange.next( { nextLine: this.localEnv.nextLine } );
  }

}
