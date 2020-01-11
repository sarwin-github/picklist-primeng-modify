import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  sales: any[];

  ngOnInit() {
    this.sales = [
      { vin: 'dsad231ff', year: '2012', brand: 'VW', color: 'Orange' },
      { vin: 'gwregre345', year: '2011', brand: 'Audi', color: 'Black' },
      { vin: 'h354htr', year: '2005', brand: 'Renault', color: 'Gray' },
      { vin: 'j6w54qgh', year: '2003', brand: 'BMW', color: 'Blue' },
      { vin: 'hrtwy34', year: '1995', brand: 'Mercedes', color: 'Orange' },
      { vin: 'jejtyj', year: '2005', brand: 'Volvo', color: 'Black' },
    ];
  }
}
