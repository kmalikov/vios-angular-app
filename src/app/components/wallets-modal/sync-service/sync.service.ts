import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {ToastService} from '../../toast-directive/toast.service';
declare const $;
declare const window;
declare const connex;

export class ConnexOpenBody {
  trusteeNominees = [];
  actionTypes = [];
  amount: number;
}

@Injectable()
export class SyncService {
  get proposalsABI() {
    return {
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
  }

  get proposalFeeABI() {
    return {
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
  }

  get openABI() {
    return {
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
  }

  get claimBallotABI() {
    return {
      'constant': false,
      'inputs': [
        {
          'name': 'amount',
          'type': 'uint256'
        }
      ],
      'name': 'claimBallot',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    };
  }

  get voteABI() {
    return {
      'constant': false,
      'inputs': [
        {
          'name': 'nominateeIndex',
          'type': 'uint256'
        },
        {
          'name': 'yayOrNay',
          'type': 'uint256'
        },
        {
          'name': 'actionType',
          'type': 'uint256'
        }
      ],
      'name': 'vote',
      'outputs': [],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    };
  }

  thor;
  acc;
  status;

  constructor(private toastService: ToastService) { }

  initConnex() {
    this.thor = connex.thor;
    this.status = this.thor.status;
    this.acc = this.thor.account(environment.tokenContractAddress);
  }

  // check if poll is open
  checkIfProposals(callback) {
    const nameMethod = this.acc.method(this.proposalsABI);
    nameMethod.call(0).then(output => {
      console.log(output);
      this.toastService.showToast('Proposals', 'Executed...');
      if (output && output.decoded && output.decoded[0] && output.decoded[0].length > 5) {
        this.toastService.showToast('Open', 'Executed...');
        callback(true);
        return;
      } else if (output && output.decoded && output.decoded['revertReason']) {
        this.toastService.showToast('Open', `Error: ${output.vmError} \n ${output.decoded['revertReason']}`, 'warning');
      }
      callback(false);
    });
  }

  // check if initialized
  checkProposalFee(callback) {
    const nameMethod = this.acc.method(this.proposalFeeABI);
    nameMethod.call().then(output => {
      console.log(output);
      if (output && output.decoded && output.decoded[0] && parseInt(output.decoded[0], 10) > 0) {
        this.toastService.showToast('Proposal Fee', 'Executed...');
        callback(true, parseInt(output.decoded[0], 10));
        return;
      } else if (output && output.decoded && output.decoded['revertReason']) {
        this.toastService.showToast('Proposal Fee', `Error: ${output.vmError} \n ${output.decoded['revertReason']}`, 'warning');
      }
      callback(false, parseInt(output.decoded[0], 10));
    });
  }

  doOpen(openBody: ConnexOpenBody) {
    const nameMethod = this.acc.method(this.openABI);
    nameMethod.call(openBody.trusteeNominees, openBody.actionTypes, openBody.amount).then(output => {
      console.log(output);

      if (output && output.decoded && output.decoded['revertReason']) {
        this.toastService.showToast('Open', `Error: ${output.vmError} \n ${output.decoded['revertReason']}`, 'warning');
      } else {
        this.toastService.showToast('Open', 'Executed...');
      }
    });
  }

  doClaimBallot(amount) {
    const nameMethod = this.acc.method(this.claimBallotABI);
    nameMethod.call(amount).then(output => {
      console.log(output);
      if (output && output.decoded && output.decoded['revertReason']) {
        this.toastService.showToast('Claim Ballot', `Error: ${output.vmError} \n ${output.decoded['revertReason']}`, 'warning');
      } else {
        this.toastService.showToast('Claim Ballot', 'Executed...');
      }
    });
  }

  doVote(nominateeIndex: number, yayOrNay: number, actionType: number) {
    const nameMethod = this.acc.method(this.voteABI);
    nameMethod.call(nominateeIndex, yayOrNay, actionType).then(output => {
      console.log(output);
      if (output && output.decoded && output.decoded['revertReason']) {
        this.toastService.showToast('Vote', `Error: ${output.vmError} \n ${output.decoded['revertReason']}`, 'warning');
      } else {
        this.toastService.showToast('Vote', 'Executed...');
      }
    });
  }

  voteSubmit() {

  }

  proposeSubmit(ballotModel) {
    const openBody = new ConnexOpenBody();
    openBody.amount = ballotModel.amount;
    ballotModel.listOfQuestion.forEach(x => {
      // q2 should be always unique
      if (x.q2 === '2') { x.q2 = new Date().getTime(); }
      openBody.trusteeNominees.push(x.q1);
      openBody.actionTypes.push(x.q2);
    });
    console.log(openBody);
    this.doOpen(openBody);
  }
}
