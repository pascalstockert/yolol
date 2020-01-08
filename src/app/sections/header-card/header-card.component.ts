import {Component, Input, OnInit} from '@angular/core';
import {DarkmodeService} from '../../darkmode.service';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss']
})
export class HeaderCardComponent implements OnInit {

  darkMode = false;
  @Input() sectionData;

  constructor(private darkModeService: DarkmodeService) { }

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe(mode => {
      this.darkMode = mode;
    });
  }

}
