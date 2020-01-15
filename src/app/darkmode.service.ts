import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Observable, empty } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

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
    this.darkMode$ = new Observable(observer => {
      router.events.subscribe(val => {
        if (isPlatformBrowser(this.platformId)) {
          // @ts-ignore
          observer.next(route.queryParams.value.mode === 'dark');
        } else {
          // in non-browser environments, provide an empty observable so you can safely subscribe to scroll$
          this.darkMode$ = empty();
        }
      });
    });
  }
}
