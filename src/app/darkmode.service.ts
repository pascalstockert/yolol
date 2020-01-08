import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent ,  Observable, empty } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/* How to use:
- import DarkmodeService and instantiate it in the constructor of your component
- subscribe to the observable:
    this.darkModeService.darkMode$.subscribe(mode => {
      console.log(mode);
    });
*/

export class DarkmodeService {

  public darkMode$: Observable<any>;

  constructor(@Inject(DOCUMENT) private document: any,
              @Inject(PLATFORM_ID) private platformId: Object,
              private router: Router,
              private route: ActivatedRoute) {
    router.events.subscribe(val => {
      if (isPlatformBrowser(this.platformId)) {
        if (val instanceof NavigationEnd) {
          this.darkMode$ = router.events.pipe(
            map(event => {
              return route.queryParams.value.mode === 'dark';
            }),
            share()
          );
        }
      } else {
        // in non-browser environments, provide an empty observable so you can safely subscribe to scroll$
        this.darkMode$ = empty();

      }
    });
  }
}
