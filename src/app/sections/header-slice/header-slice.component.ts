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

  constructor(private scrollService: WindowScrollService) {}

  ngOnInit() {
    this.background_img = this.sectionData.primary.background_image.url;
    if (this.background_img === undefined) {
      this.background_img = 'https://cobaltcrowproductions.xyz/image/53289-full_backgrounds-1920x1080-wallpaper-cave.jpg';
    }

    const slice = document.querySelector('#header-slice');
    const headerContent = document.querySelector('.abs-center');
    this.scrollService.scroll$.subscribe(pos => {
      // @ts-ignore
      slice.style.transform = 'translateY(-' + pos / 2 + 'px)';
      // @ts-ignore
      headerContent.style.opacity = 1 - window.scrollY / 300;
    });
  }

}
