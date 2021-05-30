import {Component} from '@angular/core';
import { IndexedDbService } from './services/indexed-db.service';
import { SettingsService } from './services/settings.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private indexedDbService: IndexedDbService,
               private settingsService: SettingsService) {
    this.indexedDbService.init();
    this.settingsService.init();
  }
}
