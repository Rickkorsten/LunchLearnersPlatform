import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';
// import * as admin from 'firebase-admin';

interface Employee {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

@Component({
  selector: 'app-employee-overview',
  templateUrl: './employee-overview.component.html',
  styleUrls: ['./employee-overview.component.scss']
})
export class EmployeeOverviewComponent implements OnInit {

  employeesCol: AngularFirestoreCollection<Employee>;
  employees: Observable<Employee[]>;

  selectedValue: string;

  constructor(private db: AngularFirestore, public dialog: MatDialog, public auth: AngularFireAuth) {
  }


  ngOnInit() {
    this.employeesCol = this.db.collection('companies');
    this.employees = this.employeesCol.valueChanges();
  }

  delete(uid) {
    this.db.doc(`users/${uid}`).delete();
  }
}
