import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MainService} from './main.service';
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
    setTimeout(() => this.saveDSToLocalstorage(), 2000);
    window.init();
  }

  saveDSToLocalstorage(): void {
    localStorage.setItem('vios-ds', window.ds);
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
