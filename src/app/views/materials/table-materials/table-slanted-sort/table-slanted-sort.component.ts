import { Component, OnInit, Renderer } from '@angular/core';
import { Car } from '../../../../shared/domain/car';
import { CarService } from '../../../../shared/services/car/car.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'custom-table-slanted-sort',
  animations: [mainAnimations],
  templateUrl: './table-slanted-sort.component.html',
  styleUrls: ['./table-slanted-sort.component.scss']
})
export class TableSlantedSortComponent implements OnInit {

	public cars: Car[];
    public cols: any[];

    public slanted: boolean;
    public scrollable: boolean;

    public displayedColumns: any;

    public sort = {
    	column: "",
    	direction: ""
    }

  	constructor(private carService: CarService,
        private renderer: Renderer) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);
        this.slanted = true;
        this.scrollable = true;

        this.displayedColumns = [
            {
                name: "vin",
                display: "Vin",
                width: '40px'
            },
            {
                name: "year",
                display: "Year",
                width: '40px'
            },
            {
                name: "brand",
                display: "Brand",
                width: '40px'
            },
            {
                name: "color",
                display: "Color",
                width: '40px'
            },
        ];
    }

 
    onSort(column, direction, obj){
    	let asc = direction === 'asc' ? 1 : -1;
    	let desc = direction === 'desc' ? 1 : -1;

    	let sorted = obj.sort((a,b) => {
    		var result = a[column] < b[column] ? asc : a[column] > b[column] ? desc : 0;
    		return result;
    	})

    	this.sort = {
    		column : column,
    		direction : direction
    	};

    	this.cars = sorted;
    }


    start: any = undefined;
    pressed: boolean = false;
    startX: any;
    startWidth: any;
    resizableFnMousemove:any;
    resizableFnMouseup: any;

    resizeTable(event: any, column: any) {
      this.start = event.target;
      this.pressed = true;
      this.startX = event.pageX;
      this.startWidth = this.start.clientWidth;
      this.mouseMove(column);
    }

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
