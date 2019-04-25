import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor() {
    console.log(`Build version: ${environment.version}`);
  }

  ngOnInit() {
  }
}
