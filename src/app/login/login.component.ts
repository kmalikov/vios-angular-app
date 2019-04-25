import {Component, HostBinding, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit {
  @HostBinding('class') classes = 'login-page app';
  registrationForm = false;
  listOfDS = [];
  formModel = {
    email: '',
    login: '',
    password: '',
    passwordCheck: '',
    ds: ''
  };

  constructor(private service: LoginService,
              private router: Router,
              private toastService: ToastService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    try {
      this.listOfDS = JSON.parse(localStorage.getItem('vios-ds'));
    } catch (e) {
      this.listOfDS = [
        ['http://dbpedia.org', 'DBPedia'],
        ['http://dbpedia-live.openlinksw.com', 'DBPedia Live'],
        ['http://lod.openlinksw.com', 'LOD'],
        ['http://linkeddata.uriburner.com', 'URIBurner']
      ];
    }
  }

  doLogin() {
    this.service
      .login(this.formModel.login, sha1(this.formModel.login + this.formModel.password), this.formModel.ds)
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
          this.toastService.showToast('Unsuccessful', err.status + ' ' +  err.statusText);
          console.error(err);
        });
  }

  getValue(string, param) {
    return string.substring(string.indexOf(`<${param}>`) + `<${param}>`.length, string.indexOf(`</${param}>`));
  }

  doRegister() {
    this.service
      .registration(this.formModel.login, this.formModel.password, this.formModel.email, this.formModel.ds)
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
