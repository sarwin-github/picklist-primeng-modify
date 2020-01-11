import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PickListModule } from 'primeng/picklist';
import { TableModule } from 'primeng/table';

import { MultiPickListModule } from '../components/MultiPickList';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PickListModule,
    MultiPickListModule,
    TableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
