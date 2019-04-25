import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {
  }

  login(login, passwordHash, ds): Observable<any> {
    const dsApi = `${ds}/ods/api`;
    return this.httpClient.get(`https://dev.vios.network/proxy/${dsApi}/user.authenticate`,
      {params: {user_name: login, password_hash: passwordHash}, responseType: 'text'});
  }

  registration(name, password, email, ds): Observable<any> {
    const dsApi = `${ds}/ods/api`;
    return this.httpClient.get(`https://dev.vios.network/proxy/${ds}/user.register`,
      {params: {name: name, password: password, email: email}, responseType: 'text'});
  }

  logout() {

  }

}
