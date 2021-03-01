import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/services/employe';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-bus',
  templateUrl: './list-bus.component.html',
  styleUrls: ['./list-bus.component.styl'],
})
export class ListBusComponent implements OnInit {
  p: number = 1; // Settup up pagination variable
  Bus!: Array<Bus>; // Save students data in Student's array.
  hideWhenNoEmploye: boolean = false; // Hide students data table when no student.
  noData: boolean = false; // Showing No Student Message, when no student in database.
  preLoader: boolean = true;
  constructor(
    public firebasesevice: FirebaseService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) {}

  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.firebasesevice.GetBusList();
    s.snapshotChanges().subscribe((data) => {
      // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Bus = [];
      console.log(this.Bus);
      data.map((item) => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bus.push(a as Bus);
      });
    });
  }
  // Using valueChanges() method to fetch simple list of students data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in student data list in real-time.
  dataState() {
    this.firebasesevice
      .GetBusList()
      .valueChanges()
      .subscribe((data) => {
        this.preLoader = false;
        if (data.length <= 0) {
          this.hideWhenNoEmploye = false;
          this.noData = true;
        } else {
          this.hideWhenNoEmploye = true;
          this.noData = false;
        }
      });
  }
  // Method to delete student object
  deleteBus(bus: Bus) {
    if (window.confirm('Are sure you want to delete this bus ?')) {
      // Asking from user before Deleting student data.
      this.firebasesevice.DeleteBus(bus.$key); // Using Delete student API to delete student.
      this.toastr.success('la ligne ' + bus.ligne + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }
}
