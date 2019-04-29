import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor() {
    console.log(`Build version: ${environment.version}`);
    let link;
    link = document.createElement('script');
    link.id = 'id3';
    link.type = 'application/javascript';
    link.src = `https://data.vios.network/DAV/home/vios${environment.production ? '' : '/dev'}/js/vios.js`;
    document.head.appendChild(link);
  }

  ngOnInit() {
  }
}
