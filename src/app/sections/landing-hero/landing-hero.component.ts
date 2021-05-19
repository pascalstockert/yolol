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
  voices;
  voiceTriplet = [];

  constructor( public router: Router ) {}

  ngOnInit(): void {
    this.voices = this.sectionData.items;
    this.voiceTriplet = this.shuffleVoices();
    this.backgroundImg = this.sectionData.primary.background_image.url;
  }

  shuffleVoices(): any[] {
    this.voices = this.shuffle( this.voices );
    return this.voices.slice(0, Math.min(this.voices.length, 3));
  }

  shuffle(a: any): any[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

}
