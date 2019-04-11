import {Component, HostBinding} from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import * as sha1 from 'js-sha1/build/sha1.min.js';
import {ToastService} from '../components/toast-directive/toast.service';
import {CookieService} from 'ngx-cookie-service';
import {LoginModelEnum} from '../enums/login-model';

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
              private router: Router,
              private toastService: ToastService,
              private cookieService: CookieService) {
  }

  doLogin() {
    this.service
      .login(this.formModel.login, sha1(this.formModel.login + this.formModel.password))
      .subscribe(result => {
        if (result && !result.includes('<failed>')) {
          const sid = this.getValue(result, 'sid');
          const realm = this.getValue(result, 'realm');
          const uname = this.getValue(result, 'uname');
          const uid = this.getValue(result, 'uid');
          const dba = this.getValue(result, 'dba');

          this.cookieService.set(LoginModelEnum.sid, sid, 40, '/', '', true);
          this.cookieService.set(LoginModelEnum.realm, realm, 40, '/', '', true);
          this.cookieService.set(LoginModelEnum.uname, uname, 40, '/', '', true);
          this.cookieService.set(LoginModelEnum.uid, uid, 40, '/', '', true);
          this.cookieService.set(LoginModelEnum.dba, dba, 40, '/', '', true);

          this.router.navigate(['/app', 'home']);
        } else {
          this.toastService.showToast('Unsuccessful', this.getValue(result, 'message'));
          console.error(result);
        }
      },
        err => {
          console.error(err);
        });
  }

  getValue(string, param) {
    return string.substring(string.indexOf(`<${param}>`) + `<${param}>`.length, string.indexOf(`</${param}>`));
  }

  doRegister() {
    this.service
      .registration(this.formModel.login, this.formModel.password, this.formModel.email)
      .subscribe(result => {
        if (result && !result.includes('<failed>')) {
          this.doLogin();
        } else {
          this.toastService.showToast('Unsuccessful', this.getValue(result, 'message'));
          console.error(result);
        }
      }, error1 => {
        this.toastService.showToast('Unsuccessful', this.getValue(error1.error, 'message'));
      });
  }
}
