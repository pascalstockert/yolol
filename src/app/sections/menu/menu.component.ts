import {Component, Inject, OnInit} from '@angular/core';
import {WindowScrollService} from '../../window-scroll.service';
import { DOCUMENT } from '@angular/common';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {CmsService} from '../../cms.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  providers: [CmsService]
})
export class MenuComponent implements OnInit {

  faHome = faHome;

  pages: any;
  windowPos = 0;

  public clientX: number;
  public clientY: number;

  constructor(@Inject(DOCUMENT) private document: any, private cmsService: CmsService, private scrollService: WindowScrollService) {
    const sortByProperty = function (property) {
      return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
    };
    cmsService.getPages().then(res => {
      // @ts-ignore
      this.pages = res.results.sort(sortByProperty('uid'));

      console.log(this.pages);
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
      console.log(tmpScroll, windowPos, e);
      windowPos < tmpScroll ?
        elem.classList.add('toggled') :
        elem.classList.remove('toggled');
      tmpScroll = windowPos;
    });
  }

}
