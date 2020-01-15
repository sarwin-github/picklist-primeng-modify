import { Component, OnInit, Renderer } from '@angular/core';
import { Car } from '../../../../shared/domain/car';
import { CarService } from '../../../../shared/services/car/car.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { SortEvent } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'table-slanted-sort',
  animations: [mainAnimations],
  templateUrl: './table-slanted-sort.component.html',
  styleUrls: ['./table-slanted-sort.component.scss']
})
export class TableSlantedSortComponent implements OnInit {
	public cars: Car[];
    public cars2: Car[];
    public cars3: Car[];
    public selectedCar: Car[];
    public selectedCar2: Car[];

    public cols: any[];
    public colGroupItem: any[];
    
    public slanted: boolean;
    public sticky: boolean; 
    public scrollable: boolean;

    public slanted2: boolean;
    public slanted3: boolean;

    public brands: SelectItem[];
    public clonedCars: { [s: string]: Car; } = {};
    public virtualCars: Car[];
    public totalRecords: number;
    public frozenCars: Car[];
    public frozenCols: any[];
    public scrollableCols: any[];
    public sales: any[];
    public loading: boolean;
    public inmemoryData: Car[];

  	constructor(private carService: CarService,
          private renderer: Renderer) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);
        this.carService.getCarsMedium().then(cars => {
            this.cars2 = cars;
            this.cars3 = cars;
        });

        this.brands = [
            { label: 'Audi', value: 'Audi' },
            { label: 'BMW', value: 'BMW' },
            { label: 'Fiat', value: 'Fiat' },
            { label: 'Ford', value: 'Ford' },
            { label: 'Honda', value: 'Honda' },
            { label: 'Jaguar', value: 'Jaguar' },
            { label: 'Mercedes', value: 'Mercedes' },
            { label: 'Renault', value: 'Renault' },
            { label: 'VW', value: 'VW' },
            { label: 'Volvo', value: 'Volvo' }
        ];

        this.cols = [
            { field: 'vin', header: 'Vin', width: '40px' },
            { field: 'year', header: 'Year', width: '40px' },
            { field: 'brand', header: 'Brand', width: '40px' },
            { field: 'color', header: 'Color', width: '40px' }
        ];

        this.frozenCols = [
            { field: 'vin', header: 'Vin', width: '40px' }
        ];

        this.colGroupItem = [
            { field: 'year', header: 'Year', width: '40px' },
            { field: 'brand', header: 'Brand', width: '40px' },
            { field: 'color', header: 'Color', width: '40px' }
        ];

        this.scrollableCols = [
            { field: 'year', header: 'Year', width: '40px' },
            { field: 'brand', header: 'Brand', width: '40px' },
            { field: 'color', header: 'Color', width: '40px' },
        ];

        this.frozenCars = [
            { "brand": "BMW", "year": 2013, "color": "Grey", "vin": "fh2uf23" },
            { "brand": "Chevrolet", "year": 2011, "color": "Black", "vin": "4525g23" }
        ];

        this.slanted = true;
        this.scrollable = true;
        this.sticky = true;

        this.totalRecords = 100;
        this.loading = true;
    }

    removeHighlight(){
        setTimeout(() => {
            var elements = document.getElementsByClassName('ui-sortable-column');

            for(let i = 0; i < elements.length; i++){
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
}
