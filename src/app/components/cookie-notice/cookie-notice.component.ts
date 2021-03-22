import { AfterViewInit, Component, OnInit } from '@angular/core';
import { faCookieBite, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IndexedDbService } from '../../services/indexed-db.service';
import { DarkmodeService } from '../../services/darkmode.service';

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
  darkMode = false;

  constructor( private indexedDbService: IndexedDbService,
               private darkmodeService: DarkmodeService ) { }

  async ngOnInit(): Promise<void> {
    this.darkmodeService.darkMode.subscribe( darkMode => {
      this.darkMode = darkMode;
    } );
    if ( await this.indexedDbService.get( 'dismissedCookieNotice' ) ) {
      this.cookieNotice.style.display = 'none';
    }
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

  async click(): Promise<void> {
    await this.indexedDbService.set( 'dismissedCookieNotice', true );
    this.cookieNotice.style.display = 'none';
  }

}
