import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IndexedDbService } from './indexed-db.service';

interface MenuSettings {
  darkMode: boolean;
  ligatures: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: BehaviorSubject<MenuSettings> = new BehaviorSubject<MenuSettings>( { darkMode: false, ligatures: false } );
  darkMode: BehaviorSubject<boolean> = new BehaviorSubject( false );
  ligatures: BehaviorSubject<boolean> = new BehaviorSubject( false );

  constructor( private indexedDbService: IndexedDbService ) { }

  init(): void {
    this.indexedDbService.get('settings').then( (settings) => {
      if (!!settings) {
        this.settings.next(settings);
        if (settings.darkMode) {
          this.darkMode.next(true);
        }
        if (settings.ligatures) {
          this.ligatures.next(true);
        }
        this.indexedDbService.set('settings', this.settings.value);
      } else {
        this.indexedDbService.set('settings', { darkMode: false, ligatures: false });
      }
    } );
  }

  toggleDarkmode(): void {
    this.darkMode.next(!this.darkMode.value);
    this.settings.next({ ...this.settings.value, darkMode: this.darkMode.value });
    this.indexedDbService.set( 'settings', this.settings.value );
  }

  toggleLigatures(): void {
    this.ligatures.next(!this.ligatures.value);
    this.settings.next({ ...this.settings.value, ligatures: this.ligatures.value });
    this.indexedDbService.set( 'settings', this.settings.value );
  }
}
