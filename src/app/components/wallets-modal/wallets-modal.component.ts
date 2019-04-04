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
  wallets = [];
  wallet: any;
  name = '';
  alerts: any[] = [];
  transactionModel = {
    to: '',
    amount: '',
    tokenAddress: ''
  };

  constructor(public bsModalRef: BsModalRef, private service: WalletsModalService,
              private toastService: ToastService) {
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

        try {
          const wallets = await window.arkaneConnect.api.getWallets();
          if (wallets.length > 0) {
            const walletsMap = this.convertArrayToMap(wallets, 'id');
            localStorage.setItem('wallets', JSON.stringify(walletsMap));
            $('#walletDiamond').addClass('text-warning');
            this.populateWalletsSelect(wallets);
          } else {
            this.manageWallet('ETHEREUM');
          }
        } catch (err) {
          this.toastService.showToast('Failed', 'Something went wrong while fetching the user\'s wallets');
        }
      })
        .notAuthenticated((auth) => {
          console.log('This user is not authenticated', auth);
        });
    } catch (reason) {
      window.arkaneConnect.authenticate();
      console.error(reason);
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

  async selectWallet(event) {
    if (event) {
      const wallets = JSON.parse(localStorage.getItem('wallets'));
      const wallet = wallets[event];
      this.wallet = wallet;

      const tokenBalances = await window.arkaneConnect.api.getTokenBalances(wallet.id);
      $('#wallet-tokens').html(
        tokenBalances.map((tokenBalance) => `${tokenBalance.balance} ${tokenBalance.symbol}`).join('<br/>')
      );

      $('#secret-type').val(wallet.secretType);
      this.preFillTransactionTokens(wallet, tokenBalances);

      $('#selected-wallet').removeClass('hidden');
    } else {
      $('#selected-wallet').addClass('hidden');
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
