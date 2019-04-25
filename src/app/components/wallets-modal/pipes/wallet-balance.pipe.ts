import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'WalletBalancePipe',
  pure: false
})
export class WalletBalancePipe implements PipeTransform {
  transform(value, digits?: number): any {
    if (!digits && digits !== 0) {
      digits = 1000;
    }
    if (typeof value === 'number') {
      return Math.round(value * digits) / digits;
    } else if (typeof value === 'object') {
      return value;
    } else if (typeof value === 'string') {
      value = Number(value);
      return Math.round(value * digits) / digits;
    }
  }
}
