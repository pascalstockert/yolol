import {Component, Input, OnInit} from '@angular/core';
import { WindowScrollService } from '../../window-scroll.service';

@Component({
  selector: 'app-header-slice',
  templateUrl: './header-slice.component.html',
  styleUrls: ['./header-slice.component.scss']
})

export class HeaderSliceComponent implements OnInit {

  @Input() sectionData;

  public background_img: any;

  constructor(private scrollService: WindowScrollService) {
    const slice = document.querySelector('#header-slice');
    const headerContent = document.querySelector('.abs-center');
    this.scrollService.scroll$.subscribe(pos => {
      console.log(pos);
      slice.scrollTop = pos / 2;
      // @ts-ignore
      headerContent.style.opacity = 1 - window.scrollY / 300;
    });
  }

  ngOnInit() {
    console.log(this.sectionData);
    this.background_img = this.sectionData.primary.background_image.url;
    if (this.background_img === undefined) {
      this.background_img = 'http://www.glittergraphics.org/img/78/780737/blue-square-wallpaper.jpg';
    }
  }

}
