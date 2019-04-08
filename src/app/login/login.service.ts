import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService {
  constructor(private httpClient: HttpClient) {
  }

  login(login, passwordHash): Observable<any> {
    return this.httpClient.get(environment.viosNetworkApi +
      `user.authenticate?user_name=${login}&password_hash=${passwordHash}`);
  }

  registration(): Observable<any> {
    return this.httpClient.get(environment.viosNetworkApi +
      'user.authenticate?user_name=smonroe&password_hash=6853b3adae38362df75648336946a44b3e30a8ef');
  }

  logout() {

  }

}
