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
      if ( darkMode ) {
        this.darkMode.next( true );
      } else {
        this.darkMode.next( false );
      }
    } );
  }

  switchMode(): void {
    this.darkMode.next( !this.darkMode.value );
    this.indexedDbService.set( 'darkMode', this.darkMode.value );
    console.log( this.darkMode.value );
  }
}
