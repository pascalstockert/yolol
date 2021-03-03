import {Component, Input, OnInit} from '@angular/core';
import {DarkmodeService} from '../../darkmode.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

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
