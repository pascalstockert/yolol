import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-slice',
  templateUrl: './header-slice.component.html',
  styleUrls: ['./header-slice.component.scss']
})

export class HeaderSliceComponent implements OnInit {

  @Input() sectionData;

  public backgroundImg: any;

  constructor( public router: Router ) {}

  ngOnInit(): void {
    this.backgroundImg = this.sectionData.primary.background_image.url;
    if (this.backgroundImg === undefined) {
      this.backgroundImg = 'https://cobaltcrowproductions.xyz/image/53289-full_backgrounds-1920x1080-wallpaper-cave.jpg';
    }
  }

}
