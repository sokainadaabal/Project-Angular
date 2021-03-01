import { Component, OnInit } from '@angular/core';

import { FirebaseService } from 'src/app/services/firebase.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.styl'],
})
export class NewEmployeeComponent implements OnInit {
  public employeeForm!: FormGroup;

  constructor(
    public firbaseService: FirebaseService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService // Toastr service for alert message
  ) {}
  ngOnInit() {
    this.firbaseService.GetEmplyesList();
    this.employeForm();
  }

  // Reactive student form
  employeForm() {
    this.employeeForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: [''],
      cni: [''],
      emission: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+$')],
      ],
      salaire: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  // Accessing form control using getters
  get nom() {
    return this.employeeForm.get('nom');
  }

  get prenom() {
    return this.employeeForm.get('prenom');
  }
  get cni() {
    return this.employeeForm.get('cni');
  }
  get position() {
    return this.employeeForm.get('position');
  }

  get salaire() {
    return this.employeeForm.get('salaire');
  }

  // Reset student form's values
  ResetForm() {
    this.employeeForm.reset();
  }
  submitStudentData() {
    this.firbaseService.AddEmployes(this.employeeForm.value); // Submit student data using CRUD API
    this.toastr.success(
      this.employeeForm.controls['nom'].value + " Ajout avec Succès L'employer!"
    ); // Show success message when data is successfully submited
  }
}
