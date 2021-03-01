import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.styl'],
})
export class EditBusComponent implements OnInit {
  public editForm!: FormGroup; // Define FormGroup to student's edit form
  constructor(
    private firebaseservice: FirebaseService, // Inject CRUD API in constructor
    private fb: FormBuilder, // Inject Form Builder service for Reactive forms
    private location: Location, // Location service to go back to previous component
    private actRoute: ActivatedRoute, // Activated route to get the current component's inforamation
    private router: Router, // Router service to navigate to specific component
    private toastr: ToastrService // Toastr service for alert message
  ) {}

  ngOnInit() {
    this.updateBusData(); // Call updateStudentData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id'); // Getting current component's id or information using ActivatedRoute service
    this.firebaseservice
      .GetBus(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data); // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
      });
  }

  // Accessing form control using getters
  get ligne() {
    return this.editForm.get('ligne');
  }

  get trajet() {
    return this.editForm.get('trajet');
  }
  get prix() {
    return this.editForm.get('prix');
  }
  get condicteur() {
    return this.editForm.get('condicteur');
  }

  get serviant() {
    return this.editForm.get('serviant');
  }

  // Contains Reactive Form logic
  updateBusData() {
    this.editForm = this.fb.group({
      ligne: ['', [Validators.required, Validators.minLength(2)]],
      trajet: [''],
      prix: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      condicteur: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+$')],
      ],
      serviant: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+$')],
      ],
    });
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.firebaseservice.UpdateBus(this.editForm.value); // Update student data using CRUD API
    this.toastr.success(
      this.editForm.controls['ligne'].value + ' updated successfully'
    ); // Show succes message when data is successfully submited
    this.router.navigate(['listBus']); // Navigate to student's list page when student data is updated
  }
}
