import {Component, OnInit} from '@angular/core';
import { CmsService } from '../../cms.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
      }),
      catchError(err => {
        console.log('here');
        return of(null);
      })
    ).subscribe(console.log);
  }

  ngOnInit(): void {
  }
}
