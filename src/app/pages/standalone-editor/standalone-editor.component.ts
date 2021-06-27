import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from '../../services/darkmode.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-standalone-editor',
  templateUrl: './standalone-editor.component.html',
  styleUrls: ['./standalone-editor.component.scss']
})
export class StandaloneEditorComponent implements OnInit {

  darkMode = false;

  constructor( private settingsService: SettingsService ) { }

  ngOnInit(): void {
    this.settingsService.darkMode.subscribe( darkMode => {
      this.darkMode = darkMode;
    } );
  }

}
