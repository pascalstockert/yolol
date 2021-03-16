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

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cookieNotice = document.getElementById('cookie-notice');
    this.enter();
  }

  enter(): void {
    setTimeout(() => {
      this.cookieNotice.style.opacity = '1';
      this.cookieNotice.style.transform = 'translateX(-50%) scale(1, 1)';
    }, 500);
  }

  click(): void {
    this.cookieNotice.style.display = 'none';
  }

}
