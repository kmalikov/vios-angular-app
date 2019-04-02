import 'jquery-slimscroll';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AlertModule, BsDropdownModule, BsModalService, ModalModule, TooltipModule} from 'ngx-bootstrap';

import { ROUTES } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ChatMessageComponent } from './chat-sidebar/chat-message/chat-message.component';
import { SearchPipe } from './pipes/search.pipe';
import { NotificationsLoadDirective } from './notifications/notifications-load.directive';
import { NotificationsComponent } from './notifications/notifications.component';

import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {WalletsModalComponent} from '../components/wallets-modal/wallets-modal.component';
import {WalletsModalService} from '../components/wallets-modal/wallets-modal.service';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ROUTES,
    FormsModule,
    LoadingBarRouterModule,
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    ChatSidebarComponent,
    SearchPipe,
    NotificationsComponent,
    NotificationsLoadDirective,
    ChatMessageComponent,
    WalletsModalComponent
  ],
  providers: [
    WalletsModalService
  ],
  entryComponents: [
    WalletsModalComponent
  ]
})
export class LayoutModule {
}
