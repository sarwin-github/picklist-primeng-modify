import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSlantedColgroupComponent } from './table-slanted-colgroup.component';

describe('TableSlantedColgroupComponent', () => {
  let component: TableSlantedColgroupComponent;
  let fixture: ComponentFixture<TableSlantedColgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSlantedColgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSlantedColgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
