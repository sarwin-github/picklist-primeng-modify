import { Component, OnInit, Renderer } from '@angular/core';
import { Car } from '../../../../shared/domain/car';
import { CarService } from '../../../../shared/services/car/car.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'table-slanted-header',
  animations: [mainAnimations],
  templateUrl: './table-slanted-header.component.html',
  styleUrls: ['./table-slanted-header.component.scss']
})
export class TableSlantedHeaderComponent implements OnInit {
	  public cars: Car[];
    public cars2: Car[];
    public selectedCar: Car;
    
    public cols: any[];
    public slanted: boolean;
    public sticky: boolean; 

    public slanted2: boolean;
    public slanted3: boolean;

    public brands: SelectItem[];
    public clonedCars: { [s: string]: Car; } = {};
    public frozenCols: any[];
    public scrollableCols: any[];

    public headerHeight: number = 120;
    public headerHeight2: number = 80;
    public headerHeight3: number = 80;

  	constructor(private carService: CarService,
        private renderer: Renderer) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => {
            this.cars = cars;
        });

        this.carService.getCarsMedium().then(cars => {
            this.cars2 = cars;
        });

        this.cols = [
            { field: 'vin', header: 'A Very Long Header Column Here', width: '40px' },
            { field: 'year', header: 'Year', width: '40px' },
            { field: 'brand', header: 'Brand', width: '40px' },
            { field: 'color', header: 'Color', width: '40px' }
        ];

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

        this.frozenCols = [
            { field: 'vin', header: 'Vin', width: '40px' }
        ];
        
        this.scrollableCols = [
            { field: 'year', header: 'Year', width: '40px' },
            { field: 'brand', header: 'Brand', width: '40px' },
            { field: 'color', header: 'Color', width: '40px' },
        ];

        this.slanted = true;
        this.sticky = true;

        this.slanted2 = true;
        this.slanted3 = true;
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
}
