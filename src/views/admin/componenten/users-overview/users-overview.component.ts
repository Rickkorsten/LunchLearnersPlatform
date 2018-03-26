import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
// import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';
// import * as admin from 'firebase-admin';

interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

interface Company {
  name: string;
  code: string;
}

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  usersCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  companiesCol: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;

  selectedValue: string;
  all: string;

  constructor(private db: AngularFirestore, public dialog: MatDialog, public auth: AngularFireAuth) {
    this.all = 'All';
  }


  ngOnInit() {
    this.companiesCol = this.db.collection('companies');
    this.companies = this.companiesCol.valueChanges();

    this.updateUserList('All');
  }

  delete(uid) {
    this.db.doc(`users/${uid}`).delete();
  }

  updateUserList(selected) {
    console.log(selected);
    if (selected === 'All') {
      this.usersCol = this.db.collection('users');
    } else {
      this.usersCol = this.db.collection('users', ref => ref.where('companyUid', '==', selected));
    }
    this.users = this.usersCol.valueChanges();
  }
}
