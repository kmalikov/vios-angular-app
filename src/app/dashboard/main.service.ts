import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MainService {
  constructor(private http: HttpClient) {
  }

  queryBuilder(): string {
    const str = '<query class="0" label="what records contain keywords: device" varname="s1" timeout="10"><view limit="30" type="properties" offset="0"></view><text label="device">device</text></query>';
    return str;
  }

  doXMLQuery(): Observable<any> {
    const headers = {
      'Content-Type': 'text/xml',
      'Accept': 'text/plain, */*; q=0.01'
    };
    return this.http.post(
      'http://lod.openlinksw.com/fct/service',
      this.queryBuilder(),
      {headers: headers, responseType: 'text'}
      );
  }
  doJSONQuery(): Observable<any> {
    const headers = {
      'Content-Type': 'text/xml',
    };
    return this.http.post(
      'http://dbpedia.org/fct/service',
      this.queryBuilder(),
      {headers: headers}
    );
  }
}
