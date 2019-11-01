import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-slice',
  templateUrl: './header-slice.component.html',
  styleUrls: ['./header-slice.component.scss']
})
export class HeaderSliceComponent implements OnInit {

  @Input() sectionData;

  public background_img: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.sectionData);
    this.background_img = this.sectionData.primary.background_image.url;
    if (this.background_img === undefined) {
      this.background_img = 'http://www.glittergraphics.org/img/78/780737/blue-square-wallpaper.jpg';
    }
    window.addEventListener('scroll', f);
    const slice = document.querySelector('#header-slice');
    const headerContent = document.querySelector('.abs-center');
    console.log(headerContent);
    function f() {
      slice.scrollTop = window.scrollY / 2;
      // @ts-ignore
      headerContent.style.opacity = 1 - window.scrollY / 300;
    }
  }

}
