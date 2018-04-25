import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-employee-overview',
  templateUrl: './employee-overview.component.html',
  styleUrls: ['./employee-overview.component.scss'],
  providers: [FirebaseCallsService]
})
export class EmployeeOverviewComponent implements OnInit {

  employees: any;

  constructor(
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    private FirebaseCall: FirebaseCallsService, ) {
  }


  ngOnInit() {
    this.employees = this.FirebaseCall.getEmployeesCollection();
  }

  delete(UID, companyUID) {
    this.FirebaseCall.deleteUser(UID, companyUID);
  }

}
