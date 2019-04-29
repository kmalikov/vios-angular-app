import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MainService} from './main.service';
import {environment} from '../../environments/environment';
declare const window: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  groupByList: any[];
  enable = false;

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.initVios();
  }

  initVios() {
    setTimeout(() => {
      if (!!window.init) {
        let link;
        link = document.createElement('script');
        link.id = 'setSID';
        link.type = 'application/javascript';
        link.src = `https://api.ipify.org?format=jsonp&callback=setSID`;
        document.head.appendChild(link);

        link = document.createElement('link');
        link.id = 'vioscss';
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = `https://data.vios.network/DAV/home/vios${environment.production ? '' : '/dev'}/css/vios.css`;
        document.head.appendChild(link);
      } else {
        this.initVios();
      }
    }, 500);
  }

  checkIfKeyDownEnter(event) {
    if (event && event.keyCode === 13) {
      this.explore();
      event.preventDefault();
    }
  }

  explore(): void {
    this.service.doXMLQuery('properties').subscribe(data => {
      this.groupByList = this.service.loadGroupByMenu(data);
      console.log(this.groupByList);
    });
  }
}
