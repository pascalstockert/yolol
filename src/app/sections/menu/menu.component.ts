import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';

import { CmsService } from '../../services/cms.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

interface MenuSettings {
  darkMode: boolean;
  ligatures: boolean;
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
    darkMode: this.darkMode,
    ligatures: this.ligatures
  };
  settingsLength = Object.keys(this.settings);

  constructor( @Inject( DOCUMENT ) private document: any,
               private cmsService: CmsService,
               public router: Router,
               public settingsService: SettingsService) {

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
    this.settingsService.settings.subscribe( (settings) => {
      this.settings = settings;
      console.warn(settings)
    } );
    this.settingsService.darkMode.subscribe( ( darkMode ) => {
      this.darkMode = darkMode;
    } );
  }

  switchMode(): void {
    this.settingsService.toggleDarkmode();
  }

}
