import {Component, Input, OnInit} from '@angular/core';
import {DarkmodeService} from '../../darkmode.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-collapsibles',
  templateUrl: './collapsibles.component.html',
  styleUrls: ['./collapsibles.component.scss']
})
export class CollapsiblesComponent implements OnInit {

  darkmode: boolean;
  @Input() sectionData;

  constructor(private darkModeService: DarkmodeService,
              private route: ActivatedRoute) {
    // @ts-ignore
    this.darkmode = route.queryParams.value.mode === 'dark';
  }

  ngOnInit() {
    this.darkModeService.darkMode$.subscribe( val => {
      this.darkmode = val;
    });
  }

}
