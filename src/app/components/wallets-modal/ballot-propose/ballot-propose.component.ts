import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SyncService} from '../sync-service/sync.service';

@Component({
  selector: 'app-ballot-propose',
  templateUrl: './ballot-propose.component.html',
  styleUrls: ['./ballot-propose.component.scss']
})
export class BallotProposeComponent implements OnInit {
  @Output() proposeSubmit = new EventEmitter();
  @ViewChild('amountInput') amountInput: any;
  @ViewChild('q1Input') q1Input: any;

  ballotModel = {
    question: '',
    listOfQuestion: [],
  };

  questionBody;

  constructor(private syncSerice: SyncService) { }

  ngOnInit() {
  }

  addOptionBallot() {
    if (this.amountInput) { this.amountInput.control.markAsTouched(); }
    if (this.q1Input) { this.q1Input.control.markAsTouched(); }
    this.questionBody = {
      q1: '',
      q2: '0',
      q2other: ''
    };
  }

  saveOptionBallot() {
    this.ballotModel.listOfQuestion.push(this.questionBody);
    this.questionBody = '';
  }

  cancelOptionBallot() {
    this.questionBody = '';
  }

  clearQuestionBodyValue(property) {
    this.questionBody[property] = '';
  }

  showQ2(question) {
    if (question.q2 === '0') {
      return 'Add Trustee';
    } else if (question.q2 === '1') {
      return 'Remove Trustee';
    } else if (question.q2other) {
      return question.q2other;
    }
  }

  submitBallot(ballotModel) {
    this.proposeSubmit.emit(ballotModel);
    this.questionBody = '';
  }

}
