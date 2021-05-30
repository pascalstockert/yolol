import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss']
})
export class HeaderCardComponent implements OnInit {

  darkMode: boolean;
  @Input() sectionData;

  constructor(private settingsService: SettingsService,
              private router: Router,
              private route: ActivatedRoute) {
    // @ts-ignore
    this.darkMode = this.route.queryParams.value.mode === 'dark';
  }

  ngOnInit(): void {
    this.settingsService.darkMode.subscribe( darkMode => {
      this.darkMode = darkMode;
    } );
  }

}
