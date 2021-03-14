import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { WindowScrollService } from '../../services/window-scroll.service';
import { DOCUMENT } from '@angular/common';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { CmsService } from '../../services/cms.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DarkmodeService } from '../../services/darkmode.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ],
  providers: [ CmsService ],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent {

  faHome = faHome;

  pages: any;
  windowPos = 0;
  darkMode = false;
  pageCount: number;

  constructor( @Inject( DOCUMENT ) private document: any,
               private cmsService: CmsService,
               private scrollService: WindowScrollService,
               public router: Router,
               private route: ActivatedRoute,
               private darkModeService: DarkmodeService) {
    const sortByProperty = (property) => {
      return (x, y) => {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
    };
    cmsService.getPages().then(res => {
      // @ts-ignore
      this.pages = res.results.sort(sortByProperty('uid'));
      this.pageCount = this.pages.length - 1;
    });
    router.events.subscribe(val => {
      // @ts-ignore
      this.darkMode = val instanceof NavigationEnd && route.queryParams.value.mode !== undefined;
    });
  }

}
