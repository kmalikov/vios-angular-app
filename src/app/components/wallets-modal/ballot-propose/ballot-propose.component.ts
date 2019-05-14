import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-ballot-propose',
  templateUrl: './ballot-propose.component.html',
  styleUrls: ['./ballot-propose.component.scss']
})
export class BallotProposeComponent implements OnInit {
  @ViewChild('amountInput') amountInput: any;
  @ViewChild('q1Input') q1Input: any;

  ballotModel = {
    question: '',
    listOfQuestion: [],
  };

  questionBody;

  constructor() { }

  ngOnInit() {
  }

  addOptionBallot() {
    if (this.amountInput) this.amountInput.control.markAsTouched();
    if (this.q1Input) this.q1Input.control.markAsTouched();
    this.questionBody = {
      q1: '',
      q2: '0',
      q2other: ''
    };
  }

  submitBallot() {
    this.questionBody = '';
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

}
