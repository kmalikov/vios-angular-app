import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotVerdictComponent } from './ballot-verdict.component';

describe('BallotVerdictComponent', () => {
  let component: BallotVerdictComponent;
  let fixture: ComponentFixture<BallotVerdictComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallotVerdictComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallotVerdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
