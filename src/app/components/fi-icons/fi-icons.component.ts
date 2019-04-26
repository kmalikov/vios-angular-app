import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fi-icons',
  templateUrl: './fi-icons.component.html',
  styleUrls: ['./fi-icons.component.scss']
})
export class FiIconsComponent implements OnInit {
  @HostBinding('class.flex-column-use') hostLabel = false;
  @HostBinding('class.active') hostActive = false;
  @Input() icon: string;
  @Input() label: string;
  @Input() active: boolean;
  @Input() size: 'sm' | 'lg';

  constructor() { }

  ngOnInit() {
    this.hostLabel = !!this.label;
    this.hostActive = this.active;
  }
}
