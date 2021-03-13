import {Component, Input, OnInit} from '@angular/core';
import { WindowScrollService } from '../../services/window-scroll.service';

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
  }

}
