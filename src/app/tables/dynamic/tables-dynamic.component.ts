import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

let PEOPLE = {
    'id': 0,
    'checked': false,
    'name': 'Algerd',
    'tags': 'Tags',
    'size': 'Size',
    'dateModified': new Date(),
    'contentType': 'Content Type',
    'kind': 'Kind',
    'owner': 'Owner',
    'groups': 'Groups',
    'permissions': 'Permissions',
    'actions': 'Actions'
  };

@Component({
  selector: '[tables-dynamic]',
  templateUrl: './tables-dynamic.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tables-dynamic.style.scss']
})
export class TablesDynamicComponent implements OnInit {
  @ViewChild('mf') mf;
  data = [];
  path: string = '';
  searchText: string = '';

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      PEOPLE.id = i;
      this.data.push({...PEOPLE});
    }
  }

  showMe() {
    console.log(this.mf);
  }

  selectAll(el) {
    this.data.map(x => x.checked = el.checked);
  }

  selectItem(item) {
  }
}
