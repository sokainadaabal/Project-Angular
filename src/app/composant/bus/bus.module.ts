import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BusRoutingModule } from './bus-routing.module';
import { AddBusComponent } from './add-bus/add-bus.component';
import { ListBusComponent } from './list-bus/list-bus.component';
import { EditBusComponent } from './edit-bus/edit-bus.component';

@NgModule({
  declarations: [AddBusComponent, ListBusComponent, EditBusComponent],
  imports: [BrowserModule, CommonModule, BusRoutingModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusModule {}
