import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-ballot-vote',
  templateUrl: './ballot-vote.component.html',
  styleUrls: ['./ballot-vote.component.scss']
})
export class BallotVoteComponent implements OnInit {
  @Output() voteSubmit = new EventEmitter();
  @Input() questions: any;
  @Input() depositAmount: any;

  voteModel = {
    amount: '',
    questionNumber: ''
  };

  constructor() { }

  ngOnInit() {
  }

  submit() {
    this.voteSubmit.emit();
  }

}
