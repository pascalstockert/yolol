import { Injectable } from '@angular/core';
import yazurLex from '../../../Yazur/es-modules/yolol/lex.js';
import yazurClaim  from '../../../Yazur/es-modules/yolol/parse.js';
import yazurInterpret from '../../../Yazur/es-modules/yolol/interpret.js';
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
    yazurInterpret( this );
    this.lineChange.next( { nextLine: this.localEnv.nextLine } );
  }

}
