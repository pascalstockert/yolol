import { Component, OnInit } from '@angular/core';
import { faCookieBite, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss']
})
export class CookieNoticeComponent implements OnInit {

  cookie = faCookieBite;
  times = faTimes;
  shown = false;

  constructor() { }

  ngOnInit() {
    if (!document.cookie.includes('cookieAccepted')) {
      this.shown = true;
    }
  }

  createCookie() {
    document.cookie = 'cookieAccepted=accepted';
  }

}
