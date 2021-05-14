import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { WindowScrollService } from '../../services/window-scroll.service';
import { DOCUMENT } from '@angular/common';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';

import { CmsService } from '../../services/cms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkmodeService } from '../../services/darkmode.service';

interface Setting {
  label: string;
  value: boolean;
}

interface MenuSettings {
  darkMode: Setting;
  ligatures: Setting;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.scss' ],
  providers: [ CmsService ],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  faHome = faHome;
  faCog = faCog;

  pages: any;
  windowPos = 0;
  pageCount: number;

  darkMode = false;
  ligatures = false;
  settings: MenuSettings = {
    darkMode: { label: 'Darkmode', value: this.darkMode },
    ligatures: { label: 'Ligatures', value: this.ligatures }
  };
  settingsLength = Object.keys(this.settings);

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
  }

  ngOnInit(): void {
    this.darkModeService.darkMode.subscribe( ( darkMode ) => {
      this.darkMode = darkMode;
    } );
  }

  switchMode(): void {
    this.darkModeService.switchMode();
  }

}
