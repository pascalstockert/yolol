// @ts-ignore
import * as e from './entries.json';

import { Component, OnInit } from '@angular/core';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  linkIcon = faLink;
  githubIcon = faGithub;
  discordIcon = faDiscord;

  entries = e.default;
  subtitles = Object.keys( this.entries );

  darkMode: boolean;

  constructor( private settingsService: SettingsService ) {}

  ngOnInit(): void {
    this.settingsService.darkMode.subscribe( darkMode => {
      this.darkMode = darkMode;
    } );
  }

  handleScroll( element ): void {
    console.log(element);
    const elementRef = document.getElementById( element );
    // @ts-ignore offsetTop exists on offsetParent
    const elementParentOffset = elementRef.offsetParent.offsetTop;
    const distanceTop = elementRef.offsetTop + elementParentOffset;
    window.scrollTo({top: distanceTop - 90, behavior: 'smooth'});
  }

}
