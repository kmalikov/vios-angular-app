import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WalletsModalService} from './wallets-modal.service';
import { BsModalRef } from 'ngx-bootstrap';
import {ArkaneConnect} from '@arkane-network/arkane-connect';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import {ToastService} from '../toast-directive/toast.service';
declare const $;
declare const window;

@Component({
  selector: 'wallets-modal',
  templateUrl: './wallets-modal.template.html',
  styleUrls: ['./wallets-modal.style.scss']
})
export class WalletsModalComponent implements OnInit, AfterViewInit {
  app: any = {};
  loggedIn = false;
  walletsLoading = false;
  wallets = [];
  walletsNameList = [];
  chosenWallet = '';
  tokenBalances = [];
  wallet: any;
  name = '';
  alerts: any[] = [];
  transactionModel = {
    to: '',
    amount: '',
    tokenAddress: ''
  };
  select2Options: any = {
    theme: 'bootstrap'
  };
  viosBalance: number;

  constructor(public bsModalRef: BsModalRef, private service: WalletsModalService,
              private toastService: ToastService) {
    this.walletsNameList = [ 'Bitcoin', 'Ethereum', 'VeChain', 'Litecoin', 'GoChain', 'Tron' ];
    this.chosenWallet = this.walletsNameList[0];
  }


  ngOnInit() {
    this.initApp();
  }

  ngAfterViewInit() {
  }

  async initApp() {
    window.arkaneConnect = new ArkaneConnect('vios', {environment: 'staging'});
    try {
      const authenticationResult = await window.arkaneConnect.checkAuthenticated();
      authenticationResult.authenticated(async (auth) => {
        console.log('This user is authenticated', auth);
        this.loggedIn = true;
        this.name = auth.idTokenParsed.name;
        this.getWallets();
      })
        .notAuthenticated((auth) => {
          console.log('This user is not authenticated', auth);
        });
    } catch (reason) {
      window.arkaneConnect.authenticate();
      console.error(reason);
    }
  }

  async getWallets() {
    try {
      this.walletsLoading = true;
      const wallets = await window.arkaneConnect.api.getWallets();
      if (wallets.length > 0) {
        const walletsMap = this.convertArrayToMap(wallets, 'id');
        localStorage.setItem('wallets', JSON.stringify(walletsMap));
        $('#walletDiamond').addClass('text-warning');
        this.populateWalletsSelect(wallets);
      } else {
        this.manageWallet('ETHEREUM');
      }
      this.refreshSelectedWallet();
      this.walletsLoading = false;
    } catch (err) {
      this.walletsLoading = false;
      this.toastService.showToast('Failed', 'Something went wrong while fetching the user\'s wallets');
    }
  }

  refreshSelectedWallet() {
    if (!!this.wallet) {
      this.wallet = this.wallets.find(i => i.id === this.wallet.id);
    }
  }

  convertArrayToMap(array, key) {
    return array.reduce((obj, item) => {
      obj[item[key]] = item;
      return obj;
    }, {});
  }

  populateWalletsSelect(wallets) {
    this.wallets = wallets;
    if (!!this.wallet) {
      this.refreshSelectedWallet();
      return;
    }
    const firstVechain = this.wallets.find(item => item.secretType === 'VECHAIN');
    if (!!firstVechain) {
      this.setWallet(firstVechain);
    } else {
      this.setWallet(this.wallets[0]);
    }
  }

  preFillTransactionTokens(wallet, tokenBalances) {
    const transactionTokens = $('#transaction-token');
    transactionTokens.empty();
    transactionTokens.append($('<option>', {value: ''}).text(wallet.balance.symbol));
    tokenBalances.forEach((tokenBalance) => {
      transactionTokens.append(
        $('<option>', {value: tokenBalance.tokenAddress}).text(tokenBalance.symbol)
      );
    });
  }

  doLogout() {
    window.arkaneConnect.logout();
    localStorage.removeItem('wallets');
    $('#walletDiamond').removeClass('text-warning');
  }

  manageWallet(name) {
    window.arkaneConnect.manageWallets(name);
  }

  async selectWallet(event, type?) {
    if (event) {
      const wallets = JSON.parse(localStorage.getItem('wallets'));
      const wallet = wallets[event];
      this.wallet = wallet;
      this.setWallet(wallet);
    }
  }

  async setWallet(wallet) {
    if (!!wallet) {
      this.wallet = wallet;

      const tokenBalances = await window.arkaneConnect.api.getTokenBalances(wallet.id);
      this.tokenBalances = tokenBalances;


      $('#secret-type').val(wallet.secretType);
      this.preFillTransactionTokens(wallet, tokenBalances);

      const viosBalance = tokenBalances.find(item => item.symbol === 'VIOS');
      this.viosBalance = viosBalance ? viosBalance.balance : 0;
    }
  }

  async doTransaction (model) {
    const signer = window.arkaneConnect.createSigner();
    try {
      const transactionResult = await signer.executeTransaction(
        {
          walletId: this.wallet.id,
          to: model.to,
          value: model.amount,
          secretType: this.wallet.secretType,
          tokenAddress: model.tokenAddress
        }
      );
      if (transactionResult && transactionResult.status === 'SUCCESS') {
        this.toastService.showToast('Success', 'Transaction was succeed');
        setTimeout(() => {
          this.getWallets();
        }, 250);
      } else {
        this.toastService.showToast('Failed', 'Something went wrong...');
      }
      this.transactionModel = {
        to: '',
        amount: '',
        tokenAddress: ''
      };
    } catch (reason) {
      console.error(reason);
    }
  }
}
