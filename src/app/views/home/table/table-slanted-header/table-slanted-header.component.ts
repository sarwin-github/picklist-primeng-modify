import { Component, OnInit, Renderer } from '@angular/core';
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
    public cars2: Car[];
    public cols: any[];

    public slanted: boolean;

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
            { field: 'vin', header: 'Vin', width: '40px' },
            { field: 'year', header: 'Year', width: '40px' },
            { field: 'brand', header: 'Brand', width: '40px' },
            { field: 'color', header: 'Color', width: '40px' }
        ];

        this.slanted = true;
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
      console.log(column)
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
