import { Component, OnInit } from '@angular/core';
import { Car } from '../../../../shared/domain/car';
import { CarService } from '../../../../shared/services/car/car.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'materials-table-slanted-sort',
  animations: [mainAnimations],
  templateUrl: './table-slanted-sort.component.html',
  styleUrls: ['./table-slanted-sort.component.scss']
})
export class TableSlantedSortComponent implements OnInit {

	public cars: Car[];
    public cols: any[];

    public slanted: boolean;
    public scrollable: boolean;

    public displayedColumns: any = [
    	{
	    	name: "vin",
	    	display: "Vin"
    	},
    	{
	    	name: "year",
	    	display: "Year"
    	},
    	{
	    	name: "brand",
	    	display: "Brand"
    	},
    	{
	    	name: "color",
	    	display: "Color"
    	},
    ];

    public sort = {
    	column: "",
    	direction: ""
    }

  	constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.slanted = true;
        this.scrollable = true;
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



}
