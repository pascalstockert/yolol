import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-collapsibles',
  templateUrl: './collapsibles.component.html',
  styleUrls: ['./collapsibles.component.scss']
})
export class CollapsiblesComponent implements OnInit {

  @Input() sectionData;

  constructor() { }

  ngOnInit() {
  }

}
