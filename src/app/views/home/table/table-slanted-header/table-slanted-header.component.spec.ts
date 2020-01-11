import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSlantedHeaderComponent } from './table-slanted-header.component';

describe('TableSlantedHeaderComponent', () => {
  let component: TableSlantedHeaderComponent;
  let fixture: ComponentFixture<TableSlantedHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSlantedHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSlantedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
