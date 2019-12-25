import { Pipe, PipeTransform } from '@angular/core';
import {PrismicService} from '../../../prismic.service';
import PrismicDOM from 'prismic-dom';

@Pipe({
  name: 'prismicDOM'
})
export class PrismicDOMPipe implements PipeTransform {

  constructor(private prismicService: PrismicService) {}

  transform(value: any, args?: any): any {
    if (!value) { return null; }
    return PrismicDOM.RichText.asHtml(value, this.prismicService.linkResolver);
  }

}
