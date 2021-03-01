import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEmployeeComponent } from './composant/employe/new-employee/new-employee.component';
import { ListEmployeComponent } from './composant/employe/list-employe/list-employe.component';
import { HomeComponent } from './composant/home/home.component';
import { EditEmployeComponent } from './composant/employe/edit-employe/edit-employe.component';
import { AddBusComponent } from './composant/bus/add-bus/add-bus.component';
import { ListBusComponent } from './composant/bus/list-bus/list-bus.component';
import { EditBusComponent } from './composant/bus/edit-bus/edit-bus.component';

const routes: Routes = [
  {
    path: 'employee',
    children: [
      { path: 'new', component: NewEmployeeComponent },
      { path: 'listEmployee', component: ListEmployeComponent },
      { path: 'edit-employee/:id', component: EditEmployeComponent },
    ],
  } /*{ path: 'formation/:nom', component: FormationComponent },

  */,
  { path: '', component: HomeComponent },
  {
    path: 'bus',
    children: [
      { path: 'new', component: AddBusComponent },
      { path: 'listBus', component: ListBusComponent },
      { path: 'edit/:id', component: EditBusComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
