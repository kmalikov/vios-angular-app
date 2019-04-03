import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { WidgetModule } from '../layout/widget/widget.module';
import { UtilsModule } from '../layout/utils/utils.module';
import {MainService} from './main.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {AlertModule, BsDropdownModule, TooltipModule} from 'ngx-bootstrap';
import {BootstrapWizardModule} from '../components/wizard/wizard.module';
import {NKDatetimeModule} from 'ng2-datetime/src/ng2-datetime/ng2-datetime.module';
import {Select2Module} from 'ng2-select2';
import {EditorModule} from '@tinymce/tinymce-angular';
import {ToastService} from '../components/toast-directive/toast.service';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    WidgetModule,
    UtilsModule,
    HttpClientModule,
    FormsModule,
    TextMaskModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    BootstrapWizardModule,
    NKDatetimeModule,
    Select2Module,
    EditorModule
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
