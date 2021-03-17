import {Component} from '@angular/core';
import { IndexedDbService } from './services/indexed-db.service';
import { DarkmodeService } from './services/darkmode.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private indexedDbService: IndexedDbService, private darkModeService: DarkmodeService ) {
    this.indexedDbService.init();
    this.darkModeService.init();
  }
}
