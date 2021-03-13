import {Component, Input, OnInit} from '@angular/core';
import {DarkmodeService} from '../../services/darkmode.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header-card',
  templateUrl: './header-card.component.html',
  styleUrls: ['./header-card.component.scss']
})
export class HeaderCardComponent implements OnInit {

  darkMode: boolean;
  @Input() sectionData;

  constructor(private darkModeService: DarkmodeService,
              private router: Router,
              private route: ActivatedRoute) {
    // @ts-ignore
    this.darkMode = this.route.queryParams.value.mode === 'dark'
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      // @ts-ignore
      this.darkMode = this.route.queryParams.value.mode === 'dark';
    });
  }

}
