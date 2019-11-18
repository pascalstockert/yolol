import {Component, OnInit} from '@angular/core';
import { CmsService } from '../../cms.service';
import {ActivatedRoute, NavigationEnd, ParamMap, Router} from '@angular/router';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
    this.route.paramMap.pipe(
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
        console.log(this.docHeight);
      }),
      catchError(err => {
        console.log('here');
        return of(null);
      })
    ).subscribe(console.log);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo({top: 0, behavior: 'smooth'});
    });

  }

  ngOnInit(): void {
  }
}
