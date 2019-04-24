import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fi-icons',
  templateUrl: './fi-icons.component.html',
  styleUrls: ['./fi-icons.component.scss']
})
export class FiIconsComponent implements OnInit {
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
