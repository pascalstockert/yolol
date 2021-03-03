import { Component, OnInit } from '@angular/core';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp';
import {WindowScrollService} from '../../window-scroll.service';
import {filter, timeout} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DarkmodeService} from '../../darkmode.service';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss']
})
export class ScrollTopButtonComponent implements OnInit {

  arrowUp = faArrowUp;
  scrollY: boolean;
  docHeight: number;
  clientHeight: number;
  darkmode: boolean;

  constructor(private scrollService: WindowScrollService,
              private router: Router,
              private route: ActivatedRoute,
              private darkmodeService: DarkmodeService) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.resolution();
      }
    });
    // @ts-ignore
    this.darkmode = route.queryParams.value.mode === 'dark';
    this.scrollY = true;
  }

  ngOnInit() {
    let temp = 0;
    this.scrollService.scroll$.subscribe(pos => {
      if (pos > temp || pos <= 110) {
        temp = pos;
        this.scrollY = true;
      } else if (pos < temp) {
        this.scrollY = false;
        temp = pos;
      }
    });
    this.darkmodeService.darkMode$.subscribe( val => {
      this.darkmode = val;
    });
  }

  public scrollTop() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  resolution() {
    setTimeout( f => {
      const docHeight = document.body.scrollHeight;
      this.docHeight = docHeight;
    }, 1000);
    this.clientHeight = window.outerHeight;
  }

}
