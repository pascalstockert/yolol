import { Pipe, PipeTransform } from '@angular/core';
import {PrismicService} from '../../services/prismic.service';
import PrismicDOM from 'prismic-dom';

@Pipe({
  name: 'prismicDOMtext'
})
export class PrismicDOMtextPipe implements PipeTransform {

  constructor(private prismicService: PrismicService) {}

  transform(value: any, args?: any): any {
    if (!value) { return null; }
    return PrismicDOM.RichText.asHtml(value, this.prismicService.linkResolver);
  }

}
