import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-hero',
  templateUrl: './landing-hero.component.html',
  styleUrls: ['./landing-hero.component.scss']
})
export class LandingHeroComponent implements OnInit {

  @Input() sectionData;

  public backgroundImg: any;

  constructor( public router: Router ) {}

  ngOnInit(): void {
    this.backgroundImg = this.sectionData.primary.background_image.url;
  }

}
