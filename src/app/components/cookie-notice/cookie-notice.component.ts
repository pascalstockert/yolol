import { Component, OnInit } from '@angular/core';
import { faCookieBite, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss']
})
export class CookieNoticeComponent implements OnInit {

  hidden = false;
  cookie = faCookieBite;
  times = faTimes;

  constructor() { }

  ngOnInit() {
  }

}
