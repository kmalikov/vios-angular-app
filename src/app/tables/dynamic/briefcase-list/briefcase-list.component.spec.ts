import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefcaseListComponent } from './briefcase-list.component';

describe('BriefcaseListComponent', () => {
  let component: BriefcaseListComponent;
  let fixture: ComponentFixture<BriefcaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefcaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefcaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
