import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialsRoutes } from './materials.routing';
import { MaterialsComponent } from './materials.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableSlantedSortComponent } from './table-materials/table-slanted-sort/table-slanted-sort.component';


import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    RouterModule.forChild(MaterialsRoutes)
  ],
  declarations: [
    MaterialsComponent,
  	TableSlantedSortComponent,
  ]
})
export class MaterialsModule { }
