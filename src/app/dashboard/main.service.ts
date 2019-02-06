import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as xml from 'xml-js';

@Injectable()
export class MainService {
  SIZE_LABEL = 40;
  GROUP_BY_NONE_VALUE = 'GROUPBY-NONE';
  GROUP_BY_TEXT_VALUE = 'GROUPBY-TEXT';
  VIEW_TYPE_TEXT = 'text';
  VIEW_TYPE_LIST_COUNT = 'list-count';
  constructor(private http: HttpClient) {
  }

  queryBuilder(viewType): string {
    const str = `<query class="0" varname="s1" timeout="10">${this.setViewType(viewType)}<text label="device">device</text></query>`;
    return str;
  }

  doXMLQuery(viewType): Observable<any> {
    const headers = {
      'Content-Type': 'text/xml',
      'Accept': 'text/plain, */*; q=0.01'
    };
    return this.http.post(
      'http://lod.openlinksw.com/fct/service',
      this.queryBuilder(viewType),
      {headers: headers, responseType: 'text'}
      );
  }

  processXML(data) {
    data = xml.xml2js(data, {compact: true, cdataKey: 'data'})['fct:facets']['fct:result']['fct:row'];
    data = data ? data.map(item => item['fct:column']) : [];
    return data;
  }

  loadGroupByMenu(array) {
    return this.processXML(array).map((item) => {
      let value, label, ct, datatype, shortform;
      item.map((y, index) => {
          switch (index) {
            case 0: {
              value = y.data;
              if (y['_attributes']) {
                datatype = y['_attributes']['datatype'];
                shortform = y['_attributes']['shortform'];
              }
              break;
            }
            case 1: label = y.data; break;
            case 2: ct = y.data; break;
          }
      });
      return {
        value: value,
        label: this.processLabel(label, value, datatype, 14),
        ct: ct,
        datatype: datatype,
        shortform: shortform
      };
    });
  }

  processLabel(label, value, datatype, labelSize) {
    if (!labelSize) { labelSize = this.SIZE_LABEL; }
    if (!label) {
      label = value;
    }
    label = label.trim();
    if (label.lastIndexOf('/') == label.length - 1) {
      label = label.substring(0, label.length - 1);
    } else {
      label = label.substring(label.lastIndexOf('/') + 1);
    }
    if (label.lastIndexOf('#') == label.length - 1) {
      label = label.substring(0, label.length - 1);
    } else {
      label = label.substring(label.lastIndexOf('#') + 1);
    }

    if (label.length > 1) {
      if (label.length > labelSize) {
        label = label.substring(0, labelSize) + ' ...';
      }
      label = label.split('_').join(' ');
      // POI: remove reserved chars, these will change in PoC
      // label = label.replaceAll('/', ' - ');
      label = label.replaceAll('[', ' - ');
      label = label.replaceAll(']', ' - ');
      try {
        label = decodeURIComponent((label + '').replace(/\+/g, '%20'));
      } catch (err) {

      }
    }
    return label;
  }

  fct_query(q, viewType, opt?) {
    /*// TODO fct_queryTimeout = $('#queryTimeout :selected').attr('value');
    setViewType(viewType, q);

    if (q.children.length === 2 && q.find('text').text() === '') {
      q.find('text').remove();
      // POI: root query should  have missing text element rather than blank text node, the /fct returns distinct results for each
    }

    const id = (q) ? (q).hashCode() : 0;
    // TODO q.attr('timeout', fct_queryTimeout);

    // TODO fct_updatePermalink();
    return req;*/
  }

  responseProcessing() {
/*    if(!xml.startsWith('<')) xml = xml.substring(xml.indexOf('<'));
    xml = xml.replace('fct:facets ', 'fct:facets fct:timestamp="' + new Date().getTime() + '" ');

    if(fct_complete === 'no') {
      // fct_handleIncompleteResults($("fct\\:row", xml).length, opt, viewType, fct_sparql, fct_time, fct_complete, fct_timeout, fct_dbActivity);
    }
    if(fct_complete === 'yes' || isAcceptableResults($("fct\\:row", xml).length)) { // POI: don't cache incomplete results, should this be the policy? I clicked phone on the below link, and got no results and incomplete error, but it cached the results
      // so I had to turn cache off (or increase timeout) to get the actual list, but when I turn cache back on, I get the empty results that were cached on the timeout response
      // http://myopenlink.net/DAV/home/sdmonroe/poc_draft.html?groupBy=GROUPBY-NONE&showMe=properties&qxml=%3Cquery%20class%3D%220%22%20graph%3D%22%22%20graphlabel%3D%22%22%3E%3Cclass%20class%3D%22-589865979%22%20iri%3D%22http%3A%2F%2Flinkedgeodata.org%2Fontology%2FShop%22%20label%3D%22Shop%22%3E%3C%2Fclass%3E%3Ctext%20class%3D%221%22%20label%3D%22%22%3E%3C%2Ftext%3E%3Cview%20class%3D%222%22%20limit%3D%2230%22%20type%3D%22properties%22%20offset%3D%220%22%3E%3C%2Fview%3E%3C%2Fquery%3E
    }

    switch (viewType) {
      case VIEW_TYPE_LIST: {
        fct_handleListResults(xml, opt);
      } break;
      case VIEW_TYPE_LIST_COUNT: {
        fct_handleListCountResults(xml, opt);
      } break;
      case VIEW_TYPE_TEXT: {
        fct_handleTextResults(xml, opt);
      }; break;
      case VIEW_TYPE_CLASSES: {
        fct_handleClassesResults(xml, opt);
      }; break;
      case VIEW_TYPE_PROPERTIES: {
        fct_handlePropertiesResults(xml, opt);
      }; break;
      case VIEW_TYPE_PROPERTIES_IN: {
        fct_handlePropertiesInResults(xml, opt);
      }; break;
      case VIEW_TYPE_TEXT_PROPERTIES: {
        fct_handleTextPropertiesResults(xml, opt);
      }; break;
      case VIEW_TYPE_GRAPHS: {
        fct_handleGraphResults(xml, opt);
      }; break;
    }*/

  }

  setViewType(viewType) {
    return `<view limit="30" type="${viewType}" offset="0"></view>`;
  }
}
