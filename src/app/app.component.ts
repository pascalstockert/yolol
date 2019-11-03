import {Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(router: Router) {
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
