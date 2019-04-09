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
      .subscribe(result => {
        debugger;
        if (result) {
          // this.router.navigate(['/app', 'home']);
        }
      /*
      After calling these API methods from the ./login page,
      update the localStorage ods.sid and ods.realm
      by extracting these values from the API response.
       */

      /*
      Pass the API calls through the alpha.vios.network proxy server.!!!
       */
    },
        err => {
          debugger
          console.error(err)
        });
  }

  doRegister() {
    this.service
      .registration(this.formModel.login, this.formModel.password, this.formModel.email)
      .subscribe(data => {
        debugger;
      });
  }
}
