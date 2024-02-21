import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'email',
  standalone: true
})
export class EmailPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return `mailto:${value}`;
  }

}
