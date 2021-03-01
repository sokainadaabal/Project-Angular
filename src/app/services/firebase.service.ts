import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Employe, Bus } from '../services/employe';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  employesRef!: AngularFireList<any>;
  employeRef!: AngularFireObject<any>;
  bussRef!: AngularFireList<any>;
  busRef!: AngularFireObject<any>;
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) {}
  // Fetch Employes List
  GetEmplyesList() {
    this.employesRef = this.db.list('employe');
    return this.employesRef;
  } // Fetch Single Student Object
  GetBusList() {
    this.bussRef = this.db.list('bus');
    return this.bussRef;
  }
  GetStudent(id: string) {
    this.employeRef = this.db.object('employe/' + id);
    return this.employeRef;
  }
  GetBus(id: string) {
    this.busRef = this.db.object('bus/' + id);
    return this.busRef;
  }
  // Create Student
  AddEmployes(employe: Employe) {
    this.employesRef = this.db.list('employe');
    this.employesRef.push({
      nom: employe.nom,
      prenom: employe.prenom,
      cni: employe.cni,
      emission: employe.emission,
      salaire: employe.salaire,
    });
  }
  // Create Student
  AddBus(bus: Bus) {
    this.bussRef = this.db.list('bus');
    this.bussRef.push({
      ligne: bus.ligne,
      trajet: bus.trajet,
      prix: bus.prix,
      condicteur: bus.condicteur,
      serviant: bus.serviant,
    });
  }
  // Update Employee Object
  UpdateStudent(employe: Employe) {
    this.employeRef.update({
      nom: employe.nom,
      prenom: employe.prenom,
      cni: employe.cni,
      emission: employe.emission,
      salaire: employe.salaire,
    });
  }
  // Update Bus Object
  UpdateBus(bus: Bus) {
    this.busRef.update({
      ligne: bus.ligne,
      trajet: bus.trajet,
      prix: bus.prix,
      condicteur: bus.condicteur,
      serviant: bus.serviant,
    });
  }

  // Delete Employe Object
  DeleteEmploye(id: string) {
    this.employeRef = this.db.object('employe/' + id);
    this.employeRef.remove();
  }

  // Delete Bus Object
  DeleteBus(id: string) {
    this.busRef = this.db.object('bus/' + id);
    this.busRef.remove();
  }
}
