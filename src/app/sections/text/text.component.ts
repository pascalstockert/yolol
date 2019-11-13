import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() sectionData;

  constructor() { }

  ngOnInit() {
    console.log(this.sectionData);
  }

}
