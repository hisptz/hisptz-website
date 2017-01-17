import { Pipe, PipeTransform } from '@angular/core';
import {isUndefined} from "util";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, term: any): any {

    //return all if no term is provided
    if(isUndefined(term)) return value;

    return value.filter(function(val) {
      return val.name.toLowerCase().includes(term.toLowerCase());
    })
  }

}
