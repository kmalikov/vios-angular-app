import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ballot-verdict',
  templateUrl: './ballot-verdict.component.html',
  styleUrls: ['./ballot-verdict.component.scss']
})
export class BallotVerdictComponent implements OnInit {
  questions = [1, 2, 3, 4, 5];
  constructor() { }

  ngOnInit() {
  }

}
