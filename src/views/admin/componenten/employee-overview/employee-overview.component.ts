import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';
// import * as admin from 'firebase-admin';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';

interface Employee {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  companyUid: string;
}

@Component({
  selector: 'app-employee-overview',
  templateUrl: './employee-overview.component.html',
  styleUrls: ['./employee-overview.component.scss'],
  providers: [FirebaseCallsService]
})
export class EmployeeOverviewComponent implements OnInit {

  employeesCol: AngularFirestoreCollection<Employee>;
  employees: Observable<Employee[]>;

  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    private FirebaseCall: FirebaseCallsService, ) {
  }


  ngOnInit() {
    this.employeesCol = this.db.collection('users', ref => ref.where('role', '==', 'employee'));
    this.employees = this.employeesCol.valueChanges();
  }

  delete(UID, companyUID) {
    this.FirebaseCall.deleteUser(UID, companyUID);
  }

}
