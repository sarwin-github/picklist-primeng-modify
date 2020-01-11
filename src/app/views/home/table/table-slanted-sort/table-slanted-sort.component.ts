import { Component, OnInit } from '@angular/core';
import { Car } from '../../../../shared/domain/car';
import { CarService } from '../../../../shared/services/car/car.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'table-slanted-sort',
  animations: [mainAnimations],
  templateUrl: './table-slanted-sort.component.html',
  styleUrls: ['./table-slanted-sort.component.scss']
})
export class TableSlantedSortComponent implements OnInit {
	public cars: Car[];
    public cars2: Car[];
    public cols: any[];

    public slanted: boolean;

    virtualCars: Car[];

    totalRecords: number;

    frozenCars: Car[];

    frozenCols: any[];

    scrollableCols: any[];

    sales: any[];

    loading: boolean;

    inmemoryData: Car[];

  	constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
        this.carService.getCarsMedium().then(cars => {
            this.cars2 = cars;
        });

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.slanted = true;
        this.totalRecords = 100;
        this.loading = true;
    }

    removeHighlight(){
        setTimeout(() => {
            var elements = document.getElementsByClassName('ui-sortable-column');

            for(let i = 0; i < elements.length; i++){
                console.log(elements[i])
                elements[i].classList.remove('ui-state-highlight') 
            }

        }, 100)
        /*
            elements[0].classList.remove('ui-state-highlight')
        */
    }


    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }

     loadDataOnScroll(event: LazyLoadEvent) {      
        this.loading = true;   

        //for demo purposes keep loading the same dataset 
        //in a real production application, this data should come from server by building the query with LazyLoadEvent options 
        setTimeout(() => {
            //last chunk
            if (event.first === 249980)
                this.virtualCars = this.loadChunk(event.first, 20);
            else
                this.virtualCars = this.loadChunk(event.first, event.rows);        
            
            this.loading = false;  
        }, 250);   
    }

    loadChunk(index, length): Car[] {
        let chunk: Car[] = [];
        for (let i = 0; i < length; i++) {
            chunk[i] = {...this.inmemoryData[i], ...{vin: (index + i)}};
        } 

        return chunk;
    }

}
