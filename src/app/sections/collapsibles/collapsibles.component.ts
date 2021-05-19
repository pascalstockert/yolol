import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-collapsibles',
  templateUrl: './collapsibles.component.html',
  styleUrls: ['./collapsibles.component.scss']
})
export class CollapsiblesComponent implements OnInit {

  darkmode: boolean;
  @Input() sectionData;

  constructor( private settingsService: SettingsService,
               private route: ActivatedRoute ) {
    // @ts-ignore
    this.darkmode = route.queryParams.value.mode === 'dark';
  }

  ngOnInit(): void {
    this.settingsService.darkMode.subscribe( val => {
      this.darkmode = val;
    });
  }

}
