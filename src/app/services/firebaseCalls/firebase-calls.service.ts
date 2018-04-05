import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Employee {
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

@Injectable()
export class FirebaseCallsService {

  employeesCol: AngularFirestoreCollection<Employee>;
  employees: Observable<Employee[]>;
  // company for delete user
  companyDelCol: AngularFirestoreCollection<Company>;
  companyDel: Observable<Company[]>;

  usersArray: string[];
  newArray: string[];

  constructor( private db: AngularFirestore, ) { }

  deleteUser(uid, companyUid) {
    // delete user from users collection
    this.db.doc(`users/${uid}`).delete().then(
      // and delete from companylist
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

}
