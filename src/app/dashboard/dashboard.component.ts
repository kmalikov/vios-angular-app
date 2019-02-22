import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MainService} from './main.service';
declare const google: any;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.style.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  groupByList: any[];
  groupItemSelected: any;

  enable = false;
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
    this.service.doXMLQuery('properties').subscribe(data => {
      this.groupByList = this.service.loadGroupByMenu(data);
      console.log(this.groupByList);
    });
  }

  setGroupItem(item) {
    this.groupItemSelected = item;
      // update the Group By list
      const iri = item.value;
      if (iri === this.service.GROUP_BY_NONE_VALUE || iri === this.service.GROUP_BY_TEXT_VALUE) {
        //takeFocus(q, q);
      }
      else {
        // var prop = $.createElement('property');
        // prop.attr('class', $('#groupByMenu :selected').attr('id'));
        // prop.attr('iri', iri);
        // prop.attr('exclude', 'yes');
        // getFocus(q).append(prop);
        // takeFocus(prop, getFocus(q));
      }

      // if (!isPaging) {
      //   getFocus(q).find('view').attr('offset', 0);
      //   getMainFocus().find('view').attr('offset', 0);
      //   page = 0;
      // }

      // $('#groupByMenu').addClass('loading');
      if (iri === this.service.GROUP_BY_TEXT_VALUE) {
        // TODO this.service.fct_query(q, this.service.VIEW_TYPE_TEXT);
      } else {
        // TODO this.service.fct_query(q, this.service.VIEW_TYPE_LIST_COUNT);
      }

      // update the Show Me list
      // POI: no need to update the show me during paging
      // need to check whether its ok not to update when a filter is
      // selected from the groupByMenu, in theory, the groupByMenu
      // should only list bound fields, but need to make sure
      // for now, we skip the showMe update when an item is
      // selected from the groupByMenu
      //if(!isPaging) selectShowMe();
  }
}
