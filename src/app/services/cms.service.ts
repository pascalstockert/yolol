import { Injectable } from '@angular/core';
import * as Prismic from 'prismic-javascript';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  apiRoot = 'https://yololtut.cdn.prismic.io/api/v2';

  constructor() {
  }

  async getPages() {
    return Prismic.default.getApi(this.apiRoot)
      .then(api => api.query('', {}))
      .catch(e => console.error(e));
  }

  async getPage(path: string = 'homepage') {
    return Prismic.default.getApi(this.apiRoot)
      .then(api => api.getByUID('page', path))
      .catch(e => console.error(e));
  }
}
