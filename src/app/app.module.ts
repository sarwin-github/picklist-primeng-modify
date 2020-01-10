import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PickListModule } from 'primeng/picklist';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
