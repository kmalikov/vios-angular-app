import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {WalletsModalService} from './wallets-modal.service';
import { BsModalRef } from 'ngx-bootstrap';
import {ArkaneConnect} from '@arkane-network/arkane-connect';
import {ToastService} from '../toast-directive/toast.service';
declare const $;
declare const window;
declare const connex;


const proposalsABI = {
  'constant': true,
  'inputs': [
    {
      'name': '',
      'type': 'uint256'
    }
  ],
  'name': 'proposals',
  'outputs': [
    {
      'name': 'trusteeNominee',
      'type': 'address'
    },
    {
      'name': 'yay',
      'type': 'uint256'
    },
    {
      'name': 'nay',
      'type': 'uint256'
    },
    {
      'name': 'actionType',
      'type': 'uint256'
    },
    {
      'name': 'authorizedYay',
      'type': 'uint256'
    },
    {
      'name': 'authorizedNay',
      'type': 'uint256'
    },
    {
      'name': 'authorized',
      'type': 'bool'
    }
  ],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function'
};

const proposalFeeABI = {
  'constant': true,
  'inputs': [],
  'name': 'proposal_fee',
  'outputs': [
    {
      'name': '',
      'type': 'uint256'
    }
  ],
  'payable': false,
  'stateMutability': 'view',
  'type': 'function'
};

const openABI = {
  'constant': false,
  'inputs': [
    {
      'name': 'trusteeNominees',
      'type': 'address[]'
    },
    {
      'name': 'actionTypes',
      'type': 'uint256[]'
    },
    {
      'name': 'amount',
      'type': 'uint256'
    }
  ],
  'name': 'open',
  'outputs': [],
  'payable': false,
  'stateMutability': 'nonpayable',
  'type': 'function'
};

@Component({
  selector: 'wallets-modal',
  templateUrl: './wallets-modal.template.html',
  styleUrls: ['./wallets-modal.style.scss']
})
export class WalletsModalComponent implements OnInit, AfterViewInit {
  @Output() onClose = new EventEmitter();
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
  ballotModel = {
    question: '',
    listOfQuestion: []
  };
  questionBody;
  select2Options: any = {
    theme: 'bootstrap'
  };
  viosBalance: number;

  thor;
  acc;
  status;

  isPollOpen;
  isInitialized;

  constructor(public bsModalRef: BsModalRef, private service: WalletsModalService,
              private toastService: ToastService) {
    // this.walletsNameList = [ 'Bitcoin', 'Ethereum', 'VeChain', 'Litecoin', 'GoChain', 'Tron' ];
    this.walletsNameList = [ 'Ethereum', 'VeChain' ];
    this.chosenWallet = this.walletsNameList[0];
  }

  ngOnInit() {
    this.initApp();
  }

  ngAfterViewInit() {
    if (!window.connex) {
      location.href = 'https://env.vechain.org/r/#' + encodeURIComponent(location.href);
    } else {
      this.thor = connex.thor;
      this.status = this.thor.status;
      this.acc = this.thor.account('0x698f20c5e1ce611db25F6B15293F112af4A18622');
      this.checkIfProposals((res) => this.isPollOpen = res);
      this.checkProposalFee((res) => this.isInitialized = res);
    }
  }

  // check if poll is open
  checkIfProposals(callback) {
    const nameMethod = this.acc.method(proposalsABI);
    nameMethod.call(0).then(output => {
      console.log(output);
      if (output && output.decoded && output.decoded[0].length > 5) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  // check if initialized
  checkProposalFee(callback) {
    const nameMethod = this.acc.method(proposalFeeABI);
    nameMethod.call().then(output => {
      console.log(output);
      if (output && output.decoded && output.decoded[0] > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  simulateContracting() {
    const nameMethod = this.acc.method(openABI);
    nameMethod.call(['0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'], ['2'], 1000).then(output => {
      console.log(output);
    });
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
    wallets = wallets.map(item => this.setWalletName(item));
    this.wallets = wallets;

    if (!!this.wallet) {
      this.refreshSelectedWallet();
      return;
    }

    const firstVechain = this.wallets.find(item => item.secretType === 'VECHAIN');
    (!!firstVechain) ? this.setWallet(firstVechain) : this.setWallet(this.wallets[0]);
  }

  setWalletName(item) {
    switch (item.secretType) {
      case 'BITCOIN':
        item.walletName = 'Bitcoin';
        break;
      case 'ETHEREUM':
        item.walletName = 'Ethereum';
        break;
      case 'VECHAIN':
        item.walletName = 'VeChain';
        break;
      case 'LITECOIN':
        item.walletName = 'Litecoin';
        break;
      case 'GOCHAIN':
        item.walletName = 'GoChain';
        break;
      case 'TRON':
        item.walletName = 'Tron';
        break;
    }
    return item;
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

  async selectWallet(wallet, type?) {
    if (event) {
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

  closeModal() {
    this.onClose.emit();
    this.bsModalRef.hide();
  }

  addOptionBallot() {
    this.questionBody = {
      q1: '',
      q2: ''
    };
  }

  submitBallot() {

  }

  saveOptionBallot() {
    this.ballotModel.listOfQuestion.push(this.questionBody);
    this.questionBody = '';
  }
}
