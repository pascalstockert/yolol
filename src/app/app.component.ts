import {Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { Chip } from './services/yazur.service';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(router: Router) {
    const chip = new Chip();

    router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'UA-151346620-1', {
              'page_path': event.urlAfterRedirects
            }
          );
        }
      }
    );
  }
}
