import {AfterViewInit, Component, HostBinding} from '@angular/core';
import {ArkaneConnect} from '@arkane-network/arkane-connect';
declare const $;
declare const window;

@Component({
  selector: 'app-login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html'
})
export class LoginComponent implements AfterViewInit {
  @HostBinding('class') classes = 'login-page app';
  app: any = {};
  constructor() {
    this.app.initApp = async () => {
      window.arkaneConnect = new ArkaneConnect('vios', {environment: 'staging'});
      try {
        const authenticationResult = await window.arkaneConnect.checkAuthenticated();
        authenticationResult.authenticated(async (auth) => {
          console.log('This user is authenticated', auth);
          document.body.classList.add('logged-in');
          $('#auth-username').text(auth.idTokenParsed.name);

          try {
            const wallets = await window.arkaneConnect.api.getWallets();
            if (wallets.length > 0) {
              const walletsMap = this.app.convertArrayToMap(wallets, 'id');
              localStorage.setItem('wallets', JSON.stringify(walletsMap));
              this.app.populateWalletsSelect(wallets);
            } else {
              window.arkaneConnect.manageWallets('ETHEREUM');
            }
          } catch (err) {
            console.error('Something went wrong while fetching the user\'s wallets');
          }
        })
          .notAuthenticated((auth) => {
            console.log('This user is not authenticated', auth);
          });
      } catch (reason) {
        console.error(reason);
      }
    };

    this.app.convertArrayToMap = (array, key) => {
      return array.reduce((obj, item) => {
        obj[item[key]] = item;
        return obj;
      }, {});
    };

    this.app.populateWalletsSelect = (wallets) => {
      const walletsSelect = $('#wallets-select');
      wallets.forEach((wallet) => {
        walletsSelect.append($('<option>', { value : wallet.id }).text(`${wallet.secretType} - ${wallet.address}`));
      });
    };

    this.app.preFillTransactionTokens = (wallet, tokenBalances) => {
      const transactionTokens = $('#transaction-token');
      transactionTokens.empty();
      transactionTokens.append($('<option>', {value: ''}).text(wallet.balance.symbol));
      tokenBalances.forEach((tokenBalance) => {
        transactionTokens.append(
          $('<option>', {value: tokenBalance.tokenAddress}).text(tokenBalance.symbol)
        );
      });
    };

    this.app.initApp();
  }

  ngAfterViewInit() {
    $('#auth-loginlink').click((event) => {
      event.preventDefault();
      window.arkaneConnect.authenticate();
    });

    $('#auth-logout').click((event) => {
      event.preventDefault();
      window.arkaneConnect.logout();
    });

    $('#manage-eth-wallets').click((event) => {
      event.preventDefault();
      window.arkaneConnect.manageWallets('ETHEREUM');
    });

    $('#manage-vechain-wallets').click((event) => {
      event.preventDefault();
      window.arkaneConnect.manageWallets('VECHAIN');
    });

    $('#wallets-select').change(async (event) => {
      event.preventDefault();
      if (event.target['value']) {
        const wallets = JSON.parse(localStorage.getItem('wallets'));
        const wallet = wallets[event.target['value']];
        $('#wallet-address').html(wallet.address);
        $('#wallet-balance').html(`${wallet.balance.balance} ${wallet.balance.symbol}`);
        $('#wallet-gas-balance').html(`${wallet.balance.gasBalance} ${wallet.balance.gasSymbol}`);

        const tokenBalances = await window.arkaneConnect.api.getTokenBalances(wallet.id);
        $('#wallet-tokens').html(
          tokenBalances.map((tokenBalance) => `${tokenBalance.balance} ${tokenBalance.symbol}`).join('<br/>')
        );

        $('#secret-type').val(wallet.secretType);
        this.app.preFillTransactionTokens(wallet, tokenBalances);

        $('#selected-wallet').removeClass('hidden');
      } else {
        $('#selected-wallet').addClass('hidden');
      }
    });

    $('#transaction-form').submit(async (event) => {
      event.preventDefault();
      const signer = window.arkaneConnect.createSigner();

      try {
        const transactionResult = await signer.executeTransaction(
          {
            walletId: $('#transaction-form select[name=\'from\']').val(),
            to: $('#transaction-form input[name=\'to\']').val(),
            value: ($('#transaction-form input[name=\'amount\']').val()),
            secretType: $('#transaction-form input[name=\'secretType\']').val(),
            tokenAddress: $('#transaction-form select[name=\'tokenAddress\']').val(),
          }
        );
        console.log(transactionResult.result.transactionHash);
      } catch (reason) {
        console.error(reason);
      }
    });
  }
}
