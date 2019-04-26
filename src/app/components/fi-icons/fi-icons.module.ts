import {NgModule} from '@angular/core';
import {FiIconsComponent} from './fi-icons.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    FiIconsComponent
  ],
  exports: [
    FiIconsComponent
  ]
})
export class FiIconsModule {
}
