import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ballot-vote',
  templateUrl: './ballot-vote.component.html',
  styleUrls: ['./ballot-vote.component.scss']
})
export class BallotVoteComponent implements OnInit {
  depositAmount;
  answer;
  questions = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
  }

  submit() {

  }

}
