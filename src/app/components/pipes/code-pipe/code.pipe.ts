import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'code'
})
export class CodePipe implements PipeTransform {

  transform(value: any) {
    return value.replace(/`([^`]+)`/g, '<div class=\'code-inline\'>$1</div>');
  }

}
