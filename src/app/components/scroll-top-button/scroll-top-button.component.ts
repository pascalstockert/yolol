import { Component, OnInit } from '@angular/core';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons/faArrowUp';
import {WindowScrollService} from '../../window-scroll.service';
import {filter, timeout} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss']
})
export class ScrollTopButtonComponent implements OnInit {

  arrowUp = faArrowUp;
  scrollY: number;
  docHeight: number;
  clientHeight: number;

  constructor(private scrollService: WindowScrollService, private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.resolution();
      }
    });
  }

  ngOnInit() {
    this.scrollService.scroll$.subscribe(pos => {
      this.scrollY = pos;
    });
  }

  public scrollTop() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  resolution() {
    setTimeout( f => {
      let docHeight = document.body.scrollHeight;
      this.docHeight = docHeight;
    }, 1000);
    this.clientHeight = window.outerHeight;
  }

}
