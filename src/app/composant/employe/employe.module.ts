import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeRoutingModule } from './employe-routing.module';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListEmployeComponent } from './list-employe/list-employe.component';
import { EditEmployeComponent } from './edit-employe/edit-employe.component';
@NgModule({
  declarations: [NewEmployeeComponent, ListEmployeComponent, EditEmployeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    EmployeRoutingModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EmployeModule {}
