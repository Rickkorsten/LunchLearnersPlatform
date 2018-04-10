
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';


interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  companyUid: string;
}

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
  providers: [FirebaseCallsService]
})
export class UsersOverviewComponent implements OnInit {

  usersCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  /// companies for dropdown

  all: string;
  usersArray: string[];
  newArray: string[];
  companies: any;

  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog,
    private FirebaseCall: FirebaseCallsService, ) {
    this.all = 'All';
  }


  ngOnInit() {
    this.companies = this.FirebaseCall.getCompaniesCollection();
    this.updateUserList('All');
  }

  delete(UID, companyUID) {
    this.FirebaseCall.deleteUser(UID, companyUID);
  }

  updateUserList(selected) {
    if (selected === 'All') {
      this.usersCol = this.db.collection('users', ref => ref.where('role', '==', 'user'));
    } else {
      this.usersCol = this.db.collection('users', ref => ref.where('role', '==', 'user').where('companyUid', '==', selected));
    }
    this.users = this.usersCol.valueChanges();
  }
}
