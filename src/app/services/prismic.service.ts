import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrismicService {

  constructor() { }
  linkResolver(doc) {
    if (doc.type === 'page') { return '/' + doc.uid; }
    return '/doc/' + doc.id;
  }
}
