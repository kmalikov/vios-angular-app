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
    /*if (document.location && document.location.hostname === 'localhost') {
      link.href = `https://dev.vios.network/proxy/https://raw.githubusercontent.com/Vacuity/Facets-Framework/master${environment.production ? '' : '/dev'}/vios.css`;
    } else {
      link.href = `https://raw.githubusercontent.com/Vacuity/Facets-Framework/master${environment.production ? '' : '/dev'}/vios.css`;
    }*/
    document.head.appendChild(link);

    link = document.createElement('script');
    link.id = 'viosjs';
    link.type = 'application/javascript';
    link.src = `https://data.vios.network/DAV/home/vios${environment.production ? '' : '/dev'}/js/vios.js`;
    /*if (document.location && document.location.hostname === 'localhost') {
      link.src = `https://dev.vios.network/proxy/https://raw.githubusercontent.com/Vacuity/Facets-Framework/master${environment.production ? '' : '/dev'}/vios.js`;
    } else {
      link.src = `https://raw.githubusercontent.com/Vacuity/Facets-Framework/master${environment.production ? '' : '/dev'}/vios.js`;
    }*/
    document.head.appendChild(link);
  }
}
