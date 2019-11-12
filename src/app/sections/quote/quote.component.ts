import {Component, Input, OnInit} from '@angular/core';

@Component({
  // tslint:disable-next-line
  selector: 'typo-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent implements OnInit {

  @Input() sectionData;

  constructor() { }

  ngOnInit() {
  }

}
