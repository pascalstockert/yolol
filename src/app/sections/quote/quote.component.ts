import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line
  selector: 'typo-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

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
