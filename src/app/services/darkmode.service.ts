import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})

export class DarkmodeService {

  darkMode: BehaviorSubject<boolean> = new BehaviorSubject( false );

  constructor( private indexedDbService: IndexedDbService ) {
  }

  init(): void {
    this.indexedDbService.get( 'darkMode' ).then( ( darkMode ) => {
      if ( !darkMode ) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.darkMode.next( true );
        } else {
          console.warn( 'No entry for darkMode found in indexedDB or is falsy' );
          this.darkMode.next( false );
        }
        return;
      }
    } );
  }

  switchMode(): void {
    this.darkMode.next( !this.darkMode.value );
    this.indexedDbService.set( 'darkMode', this.darkMode.value );
    console.log( this.darkMode.value );
  }
}
