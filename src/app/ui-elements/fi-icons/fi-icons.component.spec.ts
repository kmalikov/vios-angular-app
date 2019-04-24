import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiIconsComponent } from './fi-icons.component';

describe('FiIconsComponent', () => {
  let component: FiIconsComponent;
  let fixture: ComponentFixture<FiIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
