import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-page-buttons',
  templateUrl: './page-buttons.component.html',
  styleUrls: ['./page-buttons.component.scss']
})
export class PageButtonsComponent implements OnInit {

  @Input() sectionData;

  constructor() { }

  ngOnInit() {
  }

}
