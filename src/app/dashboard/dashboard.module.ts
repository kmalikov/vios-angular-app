import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { WidgetModule } from '../layout/widget/widget.module';
import { UtilsModule } from '../layout/utils/utils.module';
import {MainService} from './main.service';
import {HttpClientModule} from '@angular/common/http';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    UtilsModule,
    HttpClientModule
  ],
  providers: [
    MainService
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
  static routes = routes;
}
