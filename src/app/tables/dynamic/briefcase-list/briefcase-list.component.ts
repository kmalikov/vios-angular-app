import { Component, OnInit } from '@angular/core';

const PEOPLE = {
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
  selector: 'app-briefcase-list',
  templateUrl: './briefcase-list.component.html',
  styleUrls: ['./briefcase-list.component.scss']
})
export class BriefcaseListComponent implements OnInit {
  data = [];
  path: string = '';
  searchText: string = '';

  constructor() {
    for (let i = 0; i < 20; i++) {
      PEOPLE.id = i;
      this.data.push({...PEOPLE});
    }
  }

  ngOnInit() {
  }

  selectAll(el) {
    this.data.map(x => x.checked = el.checked);
  }

}
