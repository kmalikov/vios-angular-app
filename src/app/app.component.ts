import { Component } from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor() {
    let link;
    link = document.createElement('script');
    link.id = 'id3';
    link.type = 'application/javascript';
    link.src = `https://data.vios.network/DAV/home/vios${environment.production ? '' : '/dev'}/js/vios.js`;
    document.head.appendChild(link);
  }
}
