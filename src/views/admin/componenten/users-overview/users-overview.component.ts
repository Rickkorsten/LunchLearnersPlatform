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

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  usersCol: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  selectedValue: string;

  foods: Object[] = [
    {value: 'steak-0', viewValue: 'Tweekracht'},
    {value: 'pizza-1', viewValue: 'Decision driven data'},
    {value: 'tacos-2', viewValue: 'Dame'}
  ];

  constructor(private db: AngularFirestore, public dialog: MatDialog, public auth: AngularFireAuth) {
  }


  ngOnInit() {
    this.usersCol = this.db.collection('users');
    this.users = this.usersCol.valueChanges();
    this.usersCol = this.db.collection('users');
    this.users = this.usersCol.valueChanges();
  }

  delete(uid) {
     console.log(uid);
    // const user = admin.auth().getUser(uid);
    // console.log(user);

    // this.db.doc(`users/${uid}`).delete();
    // admin.auth().updateUser(uid, {
    //   disabled: true
    // });
  }

}
