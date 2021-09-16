import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { options } from './options';

@Component({
  selector: 'app-isan-setup',
  templateUrl: './isan-setup.component.html',
  styleUrls: ['./isan-setup.component.scss']
})
export class IsanSetupComponent implements OnInit {

  @Input() sectionData;

  darkMode: boolean;
  options = options;

  constructor( private settingsService: SettingsService ) { }

  ngOnInit(): void {
    this.settingsService.darkMode.subscribe( darkMode => {
      this.darkMode = darkMode;
    } );
  }

  optionChange( e ): void {
    console.log( e );
    this.options.map( option => {
      if ( option.name === e.name ) {
        option.cval = e.val;
      }
      return option;
    } );
  }

  findCurrentValue( name ): boolean | number {
    return this.options.find( option => option.name === name ).cval;
  }

}
