import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import {LoginService} from './login.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastModule} from '../components/toast-directive/toast.module';
import {ToastService} from '../components/toast-directive/toast.service';
import { CookieService } from 'ngx-cookie-service';

export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ToastModule
  ],
  providers: [
    LoginService,
    ToastService,
    CookieService
  ]
})
export class LoginModule {
  static routes = routes;
}
