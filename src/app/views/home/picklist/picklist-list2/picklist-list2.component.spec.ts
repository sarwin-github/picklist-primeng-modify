import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistList2Component } from './picklist-list2.component';

describe('PicklistList2Component', () => {
  let component: PicklistList2Component;
  let fixture: ComponentFixture<PicklistList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicklistList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicklistList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
