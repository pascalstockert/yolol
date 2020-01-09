import {Component, Input, OnInit} from '@angular/core';
import { faHeart, faUser, faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  heart = faHeart;
  user = faUser;
  copyright = faCopyright;

  @Input() sectionData;

  constructor() { }

  ngOnInit() {
  }

}
