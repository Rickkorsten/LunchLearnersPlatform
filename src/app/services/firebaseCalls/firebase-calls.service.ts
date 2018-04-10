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

interface Book {
  title: string;
  smallCover: string;
  publishedDate: string;
}

@Injectable()
export class FirebaseCallsService {

  employeesCol: AngularFirestoreCollection<Employee>;
  employees: Observable<Employee[]>;
  // company
  companiesCol: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;
  // books
  booksCol: AngularFirestoreCollection<Book>;
  books: Observable<Book[]>;

  usersArray: string[];
  newArray: string[];

  constructor(private db: AngularFirestore, ) { }

  ///////////////////////// DELETE USER /////////////////////////////
  deleteUser(uid, companyUid) {
    // delete user from users collection
    this.db.doc(`users/${uid}`).delete().then(
      // and delete from companylist
      void this.getUsersArrayAndUpdate(uid, companyUid)
    );
  }

  getUsersArrayAndUpdate(uid, companyUid) {
    this.companiesCol = this.db.collection('companies', ref => ref.where('uid', '==', companyUid));
    this.companies = this.companiesCol.valueChanges();
    this.companies.subscribe(data => {
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
  ///////////////////////// ////////////// /////////////////////////////

  getCompaniesCollection() {
    this.companiesCol = this.db.collection('companies');
    this.companies = this.companiesCol.valueChanges();
    return this.companies;
  }
  getBooksCollection() {
    this.booksCol = this.db.collection('books');
    this.books = this.booksCol.valueChanges();
    return this.books;
  }
}
