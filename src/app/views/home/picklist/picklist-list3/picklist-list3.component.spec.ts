import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistList3Component } from './picklist-list3.component';

describe('PicklistList3Component', () => {
  let component: PicklistList3Component;
  let fixture: ComponentFixture<PicklistList3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicklistList3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistList3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
