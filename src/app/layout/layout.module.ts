import 'jquery-slimscroll';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';

import { ROUTES } from './layout.routes';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchPipe } from './pipes/search.pipe';

import {WalletsModalComponent} from '../components/wallets-modal/wallets-modal.component';
import {WalletsModalService} from '../components/wallets-modal/wallets-modal.service';
import {ToastModule} from '../components/toast-directive/toast.module';
import {ToastService} from '../components/toast-directive/toast.service';
import {CookieService} from 'ngx-cookie-service';
import {Select2Module} from 'ng2-select2';
import {WalletIdPipe} from '../components/wallets-modal/pipes/wallet-id.pipe';
import {WalletBalancePipe} from '../components/wallets-modal/pipes/wallet-balance.pipe';
import {FiIconsModule} from '../components/fi-icons/fi-icons.module';
import {VechainModalComponent} from '../components/vechain-modal/vechain-modal.component';
import {BallotProposeComponent} from '../components/wallets-modal/ballot-propose/ballot-propose.component';
import {BallotVoteComponent} from '../components/wallets-modal/ballot-vote/ballot-vote.component';
import {BallotVerdictComponent} from '../components/wallets-modal/ballot-verdict/ballot-verdict.component';

@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ROUTES,
    FormsModule,
    // LoadingBarRouterModule,NotificationsComponent
    ModalModule.forRoot(),
    // AlertModule.forRoot(),
    ToastModule,
    Select2Module,
    FiIconsModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    // ChatSidebarComponent,
    SearchPipe,
    // NotificationsComponent,
    // NotificationsLoadDirective,
    // ChatMessageComponent,
    WalletsModalComponent,
    WalletIdPipe,
    WalletBalancePipe,
    VechainModalComponent,
    BallotProposeComponent,
    BallotVoteComponent,
    BallotVerdictComponent
  ],
  providers: [
    WalletsModalService,
    ToastService,
    CookieService
  ],
  entryComponents: [
    WalletsModalComponent,
    VechainModalComponent
  ]
})
export class LayoutModule {
}
