import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AppConfig } from '../../app.config';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import {WalletsModalComponent} from '../../components/wallets-modal/wallets-modal.component';
import {ToastService} from '../../components/toast-directive/toast.service';
import {CookieService} from 'ngx-cookie-service';
import {LoginModelEnum} from '../../enums/login-model';
declare const jQuery: any;
declare const window: any;
declare const solid: any;
declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.template.html'
})

export class SidebarComponent implements OnInit, AfterViewInit {
  $el: any;
  config: any;
  configFn: any;
  router: Router;
  location: Location;
  bsModalRef: BsModalRef;
  wallets: string;
  solidAccount: string;
  loggedIn: boolean;

  constructor(config: AppConfig, el: ElementRef, router: Router, location: Location,
              private modalService: BsModalService, private toastService: ToastService,
              private cookieService: CookieService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.configFn = config;
    this.router = router;
    this.location = location;
    this.checkIfAfterLoginOnArkane(router);
    this.checkWalletsAndSolid();
    this.checkIfLoggedIn();
  }

  checkIfAfterLoginOnArkane(router): void {
    const url = router.routerState.snapshot.url;
    if ((url.includes('state') && url.includes('session_state') && url.includes('code')) ||
         url.includes('status=SUCCESS')) {
      this.openWallet();
    } else if (url.includes('status=ABORTED')) {
      this.toastService.showToast('Unsuccessful', 'Request aborted');
    } else if (url.includes('status=FAILED&error=NOT_AUTHORIZED')) {
      this.toastService.showToast('Failed', 'Not authorized');
    }
  }

  checkWalletsAndSolid(): void {
    this.wallets = localStorage.getItem('wallets');
    this.solidAccount = localStorage.getItem('solid-auth-client');
  }

  checkIfLoggedIn() {
    this.loggedIn = !!this.cookieService.get(LoginModelEnum.sid);
  }

  initSidebarScroll(): void {
    const $sidebarContent = this.$el.find('.js-sidebar-content');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px',
      color: '#e5e7f1',
    });
  }

  changeActiveNavigationItem(location): void {
    const $newActiveLink = this.$el.find('a[href="#' + location.path().split('?')[0] + '"]');

    // collapse .collapse only if new and old active links belong to different .collapse
    if (!$newActiveLink.is('.active > .collapse > li > a')) {
      this.$el.find('.active .active').closest('.collapse').collapse('hide');
    }
    this.$el.find('.sidebar-nav .active').removeClass('active');

    $newActiveLink.closest('li').addClass('active')
      .parents('li').addClass('active');

    // uncollapse parent
    $newActiveLink.closest('.collapse').addClass('in').css('height', '')
      .siblings('a[data-toggle=collapse]').removeClass('collapsed');
  }

  ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location);
  }

  toggleSidebarOverflow($event) {
    jQuery('#sidebar').css('z-index', $event ? '2' : '0' );
    jQuery('.js-sidebar-content, .slimScrollDiv').css('overflow', $event ? 'visible' : 'hidden');
  }

  ngOnInit(): void {
    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
    this.initSidebarScroll();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location);
      }
    });
  }

  doLogout() {
    this.cookieService.delete(LoginModelEnum.sid, '/', '');
    this.cookieService.delete(LoginModelEnum.realm, '/', '');
    this.cookieService.delete(LoginModelEnum.uname, '/', '');
    this.cookieService.delete(LoginModelEnum.uid, '/', '');
    this.cookieService.delete(LoginModelEnum.dba, '/', '');

    this.checkIfLoggedIn();
  }

  async openWalletOrLogin() {
    this.openWallet();
  }

  openWallet() {
    this.bsModalRef = this.modalService.show(WalletsModalComponent, {class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  login() {
    const popupUri = 'https://solid.github.io/solid-auth-client/dist/popup.html';
    solid.auth.popupLogin({ popupUri });
  }
}
