
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';


interface User {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  companyUid: string;
}

interface Company {
  name: string;
  code: string;
  users: string[];
}

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  usersCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  /// companies for dropdown
  companiesCol: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;
  // company for delete user
  companyDelCol: AngularFirestoreCollection<Company>;
  companyDel: Observable<Company[]>;

  selectedValue: string;
  all: string;

  usersArray: string[];
  newArray: string[];

  constructor(private db: AngularFirestore, public dialog: MatDialog) {
    this.all = 'All';
  }


  ngOnInit() {
    this.companiesCol = this.db.collection('companies');
    this.companies = this.companiesCol.valueChanges();

    this.updateUserList('All');
  }

  delete(uid, companyUid) {
    // delete user from users collection
    this.db.doc(`users/${uid}`).delete().then(
    void this.getUsersArrayAndUpdate(uid, companyUid)
     );
  }

  getUsersArrayAndUpdate(uid, companyUid) {
    this.companyDelCol = this.db.collection('companies', ref => ref.where('uid', '==', companyUid));
    this.companyDel = this.companyDelCol.valueChanges();
    this.companyDel.subscribe(data => {
      if (data[0].users) {
        console.log(data[0].users);
        this.usersArray = data[0].users;
        if (this.usersArray) {
          this.deleteFromCompanyUserlist(uid, companyUid, this.usersArray);
        }
      }

    });
  }

  deleteFromCompanyUserlist(uid, companyUid, usersArray) {
    // filter uid out of array
    this.newArray = usersArray.filter(e => e !== uid);
    this.db.doc(`companies/${companyUid}`).set({
      'users': this.newArray
    }, { merge: true });
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
