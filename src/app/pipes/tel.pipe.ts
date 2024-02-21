import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tel',
  standalone: true
})
export class TelPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return `tel:${value}`;
  }

}
