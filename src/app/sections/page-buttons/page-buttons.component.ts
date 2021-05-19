import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-buttons',
  templateUrl: './page-buttons.component.html',
  styleUrls: ['./page-buttons.component.scss']
})
export class PageButtonsComponent implements OnInit {

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
