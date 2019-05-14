import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotVoteComponent } from './ballot-vote.component';

describe('BallotVoteComponent', () => {
  let component: BallotVoteComponent;
  let fixture: ComponentFixture<BallotVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallotVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallotVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
