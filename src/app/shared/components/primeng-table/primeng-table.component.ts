import { Component, OnInit, Renderer, Input } from '@angular/core';
import { Car } from '../../domain/car';
import { CarService } from '../../services/car/car.service';
import { mainAnimations } from '../../animations/main-animations';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.scss']
})
export class PrimengTableComponent implements OnInit {
	@Input() columns: any[];
	@Input() slanted: boolean;
	@Input() sticky: boolean;
	@Input() itemList: any = [];
	@Input() rowData: any  = [];
	@Input() datakey: string;
	@Input() selectable: boolean;
	@Input() selectionMode: any;
	@Input() headerHeight: string;
	@Input() resizable: boolean;
	@Input() editable: boolean;
	@Input() scrollable: boolean;
	@Input() scrollableHeight: number;
	@Input() paginator: boolean;
	@Input() rows: number = 0;
	@Input() rowsPerPageOptions: number[] = [];

	public selected: any;
	    constructor(private renderer: Renderer) { 
	    }

	    ngOnInit() {
	    	this.rowData = Array.from(this.itemList);
	    }

	    // remove highlight
	    removeHighlight(){
	    	setTimeout(() => {
	    		var elements = document.getElementsByClassName('ui-sortable-column');

	    		for(let i = 0; i < elements.length; i++){
	    			elements[i].classList.remove('ui-state-highlight') 
	    		}

	    	}, 100)
	    }

	    // custom resize table
	    public start: any = undefined;
	    public pressed: boolean = false;
	    public startX: any;
	    public startWidth: any;
	    public resizableFnMousemove:any;
	    public resizableFnMouseup: any;
	    
	    resizeTable(event: any, column: any) {
	    	this.start = event.target;
	    	this.pressed = true;
	    	this.startX = event.pageX;
	    	this.startWidth = this.start.clientWidth;
	    	this.mouseMove(column);
	    }

	    // custom resize function
	    mouseMove(column: any) {
	    	this.resizableFnMousemove = this.renderer.listen('document', 'mousemove', (event) => {
	    		if (this.pressed) {
	    			let width = this.startWidth + (event.pageX - this.startX);
	    			let index = this.start.cellIndex;
	    			column.width = width;
	    		}
	    	});

	    	this.resizableFnMouseup = this.renderer.listen('document', 'mouseup', (event) => {
	    		if (this.pressed) {
	    			this.pressed = false;
	    			this.resizableFnMousemove();
	    			this.resizableFnMouseup();
	    		}
	    	});
	    };

}
