import {Component, Input, OnInit} from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  heart = faHeart;
  user = faUser;

  @Input() sectionData;

  constructor() { }

  ngOnInit() {
  }

}
