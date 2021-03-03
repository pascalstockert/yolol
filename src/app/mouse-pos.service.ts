import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent ,  Observable, empty } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MousePosService {

  public position$: Observable<any>;

  constructor(@Inject(DOCUMENT) private document: any,
              @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.position$ = fromEvent(document.body, 'mousemove').pipe(
        map(event => {
          return [document.body.clientX, document.body.clientY];
        }),
        share()
      );
    } else {
      // in non-browser environments, provide an empty observable so you can safely subscribe to scroll$
      this.position$ = empty();

    }
  }
}
