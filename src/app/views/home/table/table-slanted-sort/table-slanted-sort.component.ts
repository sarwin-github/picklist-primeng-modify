import { Component, OnInit } from '@angular/core';
import { Car } from '../../../../shared/domain/car';
import { CarService } from '../../../../shared/services/car/car.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'table-slanted-sort',
  animations: [mainAnimations],
  templateUrl: './table-slanted-sort.component.html',
  styleUrls: ['./table-slanted-sort.component.scss']
})
export class TableSlantedSortComponent implements OnInit {
	public cars: Car[];
    public cols: any[];

    public slanted: boolean;

  	constructor(private carService: CarService) { }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

        this.slanted = true;
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
