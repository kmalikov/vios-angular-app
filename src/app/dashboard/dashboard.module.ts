import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {MainService} from './main.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap';
import {ToastService} from '../components/toast-directive/toast.service';

export const routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot()
  ],
  providers: [
    MainService,
    ToastService
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
  static routes = routes;
}
