import { NgModule, Component, ElementRef, AfterContentInit, AfterViewChecked, Input, Output, ContentChildren, QueryList, TemplateRef, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'p-multiPickList',
  template: `
    <div
      [class]="styleClass"
      [ngClass]="{'ui-multi-picklist ui-picklist ui-widget ui-helper-clearfix': true,'ui-picklist-responsive': responsive}"
      [ngStyle]="style"
    >
      <ng-template ngFor let-col [ngForOf]="lists" let-index="index">
        <div
          class="ui-picklist-listwrapper ui-picklist-target-wrapper"
          [ngClass]="{'ui-picklist-listwrapper-nocontrols': true}"
        >
          <div
            *ngIf="col.header"
            class="ui-picklist-caption ui-widget-header ui-corner-tl ui-corner-tr"
          >{{col.header}}</div>
          <ul
            class="ui-widget-content ui-picklist-list ui-picklist-target ui-corner-bottom"
            [ngClass]="{'ui-picklist-highlight': true}"
            [ngStyle]="targetStyle"
          >
            <ng-template ngFor let-item [ngForOf]="col.list" let-i="index" let-l="last">
              <li
                *ngIf="dragdrop"
                class="ui-picklist-droppoint" 
                [ngClass]="{'ui-picklist-droppoint-highlight': (toList === index && to === i)}"
                (dragover)="onDragOver($event, index,i)"
                (drop)="onDrop($event, index, i)"
                (dragleave)="onDragLeave($event, index)"
              ></li>
              <li 
                [ngClass]="{'ui-picklist-item':true, 'ui-state-disabled': disabled}"
                tabindex="0"
                [draggable]="dragdrop"
                (dragstart)="onDragStart($event, index, i)"
                (dragend)="onDragEnd($event)"
              >
                <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
              </li>
              <li
                *ngIf="dragdrop&&l"
                class="ui-picklist-droppoint"
                [ngClass]="{'ui-picklist-droppoint-highlight': (toList == index && to === i + 1)}"
                (dragover)="onDragOver($event, index, i + 1)"
                (dragleave)="onDragLeave($event, index)"
                (drop)="onDrop($event, index, i + 1)"
              ></li>
            </ng-template>
            <li
              *ngIf="dragdrop && col.list.length === 0"
              class="ui-picklist-droppoint"
              [ngClass]="{'ui-picklist-droppoint-highlight': (toList == index && to === 0)}"
              (dragover)="onDragOver($event, index, 0)"
              (dragleave)="onDragLeave($event, index)"
              (drop)="onDrop($event, index, 0)"
            ></li>
          </ul>
        </div>
      </ng-template>
    </div>
  `
})
export class MultiPickList implements AfterContentInit {
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
  onDropPoint: boolean = false;

  debug: boolean = true;

  dragdrop: boolean = true;

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
    this.to = -1;
    this.onDropPoint = false;
  }

  onDrop(event: DragEvent, list: number, index: number) {
    if (this.debug) console.log('drop');
    const list1 = this.lists[this.fromList].list;
    const list2 = this.lists[this.toList].list;
    if (this.onDropPoint) {
      const del = list1.splice(this.from, 1);
      list2.splice(this.to, 0, del[0]);
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

@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [MultiPickList, SharedModule],
  declarations: [MultiPickList]
})
export class MultiPickListModule { }
