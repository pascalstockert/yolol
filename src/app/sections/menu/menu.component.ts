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
    cmsService.getPages().then(res => {
      // @ts-ignore
      this.pages = res.results.reverse();
    });
  }

  ngOnInit() {
    this.windowPos = 0;
    const elem = document.querySelector('.menu');
    this.scrollService.scroll$.subscribe(pos => {
      this.windowPos = pos;
    });

    this.document.body.onmousemove = function f(e) {
      this.clientX = e.clientX;
      this.clientY = e.clientY;
      if (this.clientY <= 200 || this.windowPos < 5) {
        elem.classList.add('toggled');
      } else
        if (this.windowPos > 200 && this.clientY > 200) {
        elem.classList.remove('toggled');
      }
    };
  }

}
