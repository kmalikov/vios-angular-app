import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotProposeComponent } from './ballot-propose.component';

describe('BallotProposeComponent', () => {
  let component: BallotProposeComponent;
  let fixture: ComponentFixture<BallotProposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallotProposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallotProposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
