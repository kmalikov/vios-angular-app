import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'WalletIdPipe',
  pure: false
})
export class WalletIdPipe implements PipeTransform {
  transform(value): string {
    if (typeof value === 'number') {
      value = value.toString();
    } else if (typeof value === 'object') {
      return value;
    }
    if (value.length) {
      return `${value.substr(0, 5)}...${value.substr(-4)}`;
    } else {
      return value;
    }
  }
}
