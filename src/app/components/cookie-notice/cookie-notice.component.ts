import {AfterViewInit, Component, OnInit} from '@angular/core';
import { faCookieBite, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrls: ['./cookie-notice.component.scss']
})
export class CookieNoticeComponent implements OnInit, AfterViewInit {

  hidden = false;
  cookie = faCookieBite;
  times = faTimes;
  cookieNotice: HTMLElement;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cookieNotice = document.getElementById('cookie-notice');
    this.enter();
  }

  enter() {
    setTimeout(() => {
      this.cookieNotice.style.opacity = '1';
      this.cookieNotice.style.transform = 'scale(1, 1)';
      this.cookieNotice.style.bottom = '30px';
    }, 500);
  }

  click() {
    this.cookieNotice.style.display = 'none';
  }

}
