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
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.styl'],
})
export class AddBusComponent implements OnInit {
  public busForm!: FormGroup;

  constructor(
    public firbaseService: FirebaseService, // CRUD API services
    public fb: FormBuilder, // Form Builder service for Reactive forms
    public toastr: ToastrService // Toastr service for alert message
  ) {}
  ngOnInit() {
    this.firbaseService.GetBusList();
    this.bussForm();
  }

  // Reactive student form
  bussForm() {
    this.busForm = this.fb.group({
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

  // Accessing form control using getters
  get ligne() {
    return this.busForm.get('ligne');
  }

  get trajet() {
    return this.busForm.get('trajet');
  }
  get prix() {
    return this.busForm.get('prix');
  }
  get condicteur() {
    return this.busForm.get('condicteur');
  }

  get serviant() {
    return this.busForm.get('serviant');
  }

  // Reset student form's values
  ResetForm() {
    this.busForm.reset();
  }
  submitBusData() {
    this.firbaseService.AddBus(this.busForm.value); // Submit student data using CRUD API
    this.toastr.success(
      'le bus de la ligne ' +
        this.busForm.controls['ligne'].value +
        ' Ajout avec Succès!'
    ); // Show success message when data is successfully submited
  }
}
