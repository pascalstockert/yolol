import {Component, Input, OnInit} from '@angular/core';
import {DarkmodeService} from '../../darkmode.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-buttons',
  templateUrl: './page-buttons.component.html',
  styleUrls: ['./page-buttons.component.scss']
})
export class PageButtonsComponent implements OnInit {

  darkmode: boolean;
  @Input() sectionData;

  constructor(private darkmodeService: DarkmodeService,
              private route: ActivatedRoute) {
    // @ts-ignore
    this.darkmode = route.queryParams.value.mode === 'dark';
  }

  ngOnInit() {
    this.darkmodeService.darkMode$.subscribe( val => {
      this.darkmode = val;
    });
  }

}
