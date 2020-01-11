import { Component, OnInit } from '@angular/core';
import { Car } from '../../../../shared/domain/car';
import { CarService } from '../../../../shared/services/car/car.service';
import { mainAnimations } from '../../../../shared/animations/main-animations';

@Component({
  selector: 'table-slanted-header',
  animations: [mainAnimations],
  templateUrl: './table-slanted-header.component.html',
  styleUrls: ['./table-slanted-header.component.scss']
})
export class TableSlantedHeaderComponent implements OnInit {
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

}