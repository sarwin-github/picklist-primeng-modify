import { NgModule, Component, ElementRef, AfterContentInit, AfterViewChecked, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'p-multiPickList',
  templateUrl: './multi-picklist.html',
})
export class MultiPickListComponent implements AfterContentInit {
  @Input() lists: any[];
  @Input() source: any[];
  @Input() responsive: boolean;
  @Input() metaKeySelection: boolean = true;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() sourceStyle: any;
  @Input() targetStyle: any;
  @Input() disabled: boolean = false;
  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  public itemTemplate: TemplateRef<any>;
  dragging: boolean;
  fromList: number = -1;
  toList: number = -1;
  from: number;
  to: number;
  onDropPoint: boolean = true;
  debug: boolean = true;
  dragdrop: boolean = true;
  types: string[] = ['non-requested', 'recommend', 'mandatory']

  onDragStart(event: DragEvent, list: number, item: number) {
    (<HTMLLIElement>event.target).blur();
    this.dragging = true;
    this.fromList = list;
    this.from = item;
  }

  onDragOver(event: DragEvent, list: number, index: number) {
    if (this.debug) console.log('over');
    if (this.dragging) {
      this.toList = list;
      this.to = index;
      this.onDropPoint = true;
    }
    event.preventDefault();
  }

  onDragLeave(event: DragEvent, list: number) {
    if (this.debug) console.log('leave');

    this.onDropPoint = true;
    this.to = -1;
  }

  // after item have been dropped
  onDrop(event: DragEvent, list: number, index: number) {
    if (this.debug) console.log('drop');
    const list1 = this.lists[this.fromList].list;
    const list2 = this.lists[this.toList].list;

    if (this.onDropPoint) {
      const del = list1.splice(this.from, 1);
      list2.splice(this.to, 0, del[0]);
      if(list2[index])
        list2[index].type = this.types[this.toList];

      this.fromList = -1;
      this.toList = -1;
      this.dragging = false;
      event.preventDefault();
    }
  }

  onDragEnd(event: DragEvent) {
    if (this.debug) console.log('end');
    this.fromList = -1;
    this.toList = -1;
    this.dragging = false;
  }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      this.itemTemplate = item.template;
    });
  }
}

