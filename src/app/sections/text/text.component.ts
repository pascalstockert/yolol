import { Component, Input, OnInit } from '@angular/core';
import { DarkmodeService } from '../../services/darkmode.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  darkmode: boolean;
  @Input() sectionData;

  constructor( private darkmodeService: DarkmodeService,
               private route: ActivatedRoute ) {
    // @ts-ignore
    this.darkmode = route.queryParams.value.mode === 'dark';
  }

  ngOnInit(): void {
    this.darkmodeService.darkMode.subscribe( val => {
      this.darkmode = val;
    });
  }

}
