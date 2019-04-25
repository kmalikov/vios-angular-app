import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[tables-dynamic]',
  templateUrl: './tables-dynamic.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tables-dynamic.style.scss']
})
export class TablesDynamicComponent implements OnInit {
  @ViewChild('mf') mf;
  isMainScreen = 'main';

  constructor() {
  }

  ngOnInit(): void {
  }

  setAnotherScreen(screen) {
    this.isMainScreen = screen;
  }
}
