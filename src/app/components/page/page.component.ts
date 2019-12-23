import {Component, OnInit} from '@angular/core';
import { CmsService } from '../../cms.service';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Observable, of, combineLatest} from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [CmsService]
})
export class PageComponent implements OnInit {

  page: any;
  public test: string;
  docHeight: number;

  constructor(private cmsService: CmsService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
    const pages = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('slug')),
      switchMap(slug => this.cmsService.getPage(slug)),
      tap(page => {
        this.page = page ? page : {type: 404};
        this.test = this.page.data.body[0].primary.is_large;
        this.docHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        );
      }),
      catchError(err => {
        console.log('here');
        return of(null);
      })
    );
    pages.subscribe(console.log);
    const routing = this.router.events;
    routing.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
    const combinedThings = combineLatest(pages, routing);
    combinedThings.subscribe(x => {
      setTimeout(f => {
        let pTags = Array.from(document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6'));
        for (const pTag of pTags) {
          if (pTag.innerHTML.includes('')) {
            pTag.innerHTML = pTag.innerHTML.replace(/`{3}([^`]+)`{3}/g, '<div class=\'code-block\'>$1</div>');
          }
          if (pTag.innerHTML.includes('')) {
            pTag.innerHTML = pTag.innerHTML.replace(/`([^`]+)`/g, '<div class=\'code-inline\'>$1</div>');
          }
        }
      });
    });

  }

  ngOnInit(): void {
  }
}
