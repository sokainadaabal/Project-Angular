import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-employe',
  templateUrl: './edit-employe.component.html',
  styleUrls: ['./edit-employe.component.styl'],
})
export class EditEmployeComponent implements OnInit {
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
    this.updateStudentData(); // Call updateStudentData() as soon as the component is ready
    const id = this.actRoute.snapshot.paramMap.get('id'); // Getting current component's id or information using ActivatedRoute service
    this.firebaseservice
      .GetStudent(id)
      .valueChanges()
      .subscribe((data: string) => {
        this.editForm.setValue(data); // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form
      });
  }

  // Accessing form control using getters
  get nom() {
    return this.editForm.get('nom');
  }
  get prenom() {
    return this.editForm.get('prenome');
  }

  get cni() {
    return this.editForm.get('cni');
  }

  get emission() {
    return this.editForm.get('emission');
  }

  get salaire() {
    return this.editForm.get('salaire');
  }
  // Contains Reactive Form logic
  updateStudentData() {
    this.editForm = this.fb.group({
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

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.firebaseservice.UpdateStudent(this.editForm.value); // Update student data using CRUD API
    this.toastr.success(
      this.editForm.controls['nom'].value + ' updated successfully'
    ); // Show succes message when data is successfully submited
    this.router.navigate(['listEmployee']); // Navigate to student's list page when student data is updated
  }
}
