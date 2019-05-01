import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  status;
  constructor() {
    console.log(`Build version: ${environment.version}`);
  }

  ngOnInit() {
    this.appendExternalScripts();


  }

  appendExternalScripts() {
    let link;
    link = document.createElement('link');
    link.id = 'vioscss';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = `https://data.vios.network/DAV/home/vios${environment.production ? '' : '/dev'}/css/vios.css`;
    document.head.appendChild(link);

    link = document.createElement('script');
    link.id = 'viosjs';
    link.type = 'application/javascript';
    link.src = `https://data.vios.network/DAV/home/vios${environment.production ? '' : '/dev'}/js/vios.js`;
    document.head.appendChild(link);
  }
}
