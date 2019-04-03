import {NgModule} from '@angular/core';
import {ToastComponent} from './toast.component';
import {ToastService} from './toast.service';

@NgModule({
  declarations: [
    ToastComponent
  ],
  providers: [
    ToastService
  ],
  exports: [
    ToastComponent
  ]
})
export class ToastModule {
}
