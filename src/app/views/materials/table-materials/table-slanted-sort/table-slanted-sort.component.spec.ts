import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSlantedSortComponent } from './table-slanted-sort.component';

describe('TableSlantedSortComponent', () => {
  let component: TableSlantedSortComponent;
  let fixture: ComponentFixture<TableSlantedSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSlantedSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSlantedSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
