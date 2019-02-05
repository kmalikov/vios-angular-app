import {Component, OnInit} from '@angular/core';
import {MainService} from './main.service';
import * as xml from 'xml-js';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.scss'],
})
export class DashboardComponent implements OnInit {
  groupByList: any[];
  constructor(private service: MainService) {
  }

  ngOnInit(): void {
  }

  checkIfKeyDownEnter(event) {
    if (event && event.keyCode === 13) {
      this.explore();
      event.preventDefault();
    }
  }

  explore(): void {
    this.service.doXMLQuery().subscribe(data => {
      console.log(xml.xml2js(data, {compact: true, cdataKey: '_cdata'}));
    });
  }
}
