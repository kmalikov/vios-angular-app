import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'WalletIdPipe',
  pure: false
})
export class WalletIdPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length) {
      return `${value.substr(0, 5)}...${value.substr(-4)}`;
    }
  }
}
