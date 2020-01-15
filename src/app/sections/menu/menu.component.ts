import {Component, Inject, OnInit, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {WindowScrollService} from '../../window-scroll.service';
import { DOCUMENT } from '@angular/common';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import {CmsService} from '../../cms.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DarkmodeService} from '../../darkmode.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [CmsService],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit, AfterViewInit {

  faHome = faHome;

  pages: any;
  windowPos = 0;
  darkMode = false;

  constructor(@Inject(DOCUMENT) private document: any,
              private cmsService: CmsService,
              private scrollService: WindowScrollService,
              private router: Router,
              private route: ActivatedRoute,
              private darkModeService: DarkmodeService) {
    const sortByProperty = function (property) {
      return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
    };
    cmsService.getPages().then(res => {
      // @ts-ignore
      this.pages = res.results.sort(sortByProperty('uid'));
    });
    router.events.subscribe(val => {
      // @ts-ignore
      this.darkMode = val instanceof NavigationEnd && route.queryParams.value.mode !== undefined;
    });
  }

  ngOnInit() {
    this.windowPos = 0;
    const elem = document.querySelector('.menu');
    this.scrollService.scroll$.subscribe(pos => {
      this.windowPos = pos;
    });
    let tmpScroll = 0;

    window.addEventListener('scroll', function f(e) {
      const windowPos = window.scrollY;
      windowPos < tmpScroll ?
        elem.classList.add('toggled') :
        elem.classList.remove('toggled');
      tmpScroll = windowPos;
    });
  }

  ngAfterViewInit() {
    window.setTimeout( () => {
      console.log(document.getElementById('cdk-overlay-0'));
    }, 300);
  }

}
