import {Component, Input, OnInit} from '@angular/core';
import { faHeart, faUser, faCopyright } from '@fortawesome/free-solid-svg-icons';
import {DarkmodeService} from '../../services/darkmode.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  heart = faHeart;
  user = faUser;
  copyright = faCopyright;
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
