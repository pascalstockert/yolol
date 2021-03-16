import {Component} from '@angular/core';
import { IndexedDbService } from './services/indexed-db.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor( private indexedDbService: IndexedDbService ) {
    this.indexedDbService.init();
  }
}
