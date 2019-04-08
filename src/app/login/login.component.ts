import {Component, HostBinding} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import * as sha1 from 'js-sha1/build/sha1.min.js';


@Component({
  selector: 'app-login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html'
})
export class LoginComponent {
  @HostBinding('class') classes = 'login-page app';
  registrationForm = false;
  formModel = {
    email: '',
    login: '',
    password: '',
    passwordCheck: ''
  };

  constructor(private service: LoginService,
              private router: Router) {
  }

  doLogin() {
    this.service
      .login(this.formModel.login, sha1(this.formModel.login + this.formModel.password))
      .filter(data => !!data)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/app', 'home']);
        }
      /*
      After calling these API methods from the ./login page,
      update the localStorage ods.sid and ods.realm
      by extracting these values from the API response.
       */

      /*
      Pass the API calls through the alpha.vios.network proxy server.!!!
       */

      /*
      user_name = user id
      password_hash = SHA1(user_name+password)
       */
    });
  }

  doRegister() {
    // this.service.registration().subscribe(data => {
      // what next?
    // });
  }
}
