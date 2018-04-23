import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Employee {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  companyUid?: string;
}

interface Company {
  name: string;
  code: string;
  users: string[];
}

interface Book {
  uid?: string;
  title?: string;
  subTitle?: string;
  author?: string;
  smallCover?: string;
  publishedDate?: string;
  description?: string;
  categorie?: string;
  publisher?: string;
}

interface Review {
  presentor: string;
  q1?: number;
  q2?: number;
  q3?: number;
  q4?: number;
  q5?: number;
  q6?: number;
  q7?: number;
  q8?: number;
  q9?: number;
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
  // review
  reviewsCol: AngularFirestoreCollection<Review>;
  reviews: Observable<Review[]>;

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

  getBook(reviewId) {
    this.booksCol = this.db.collection('books', ref => ref.where('reviewId', '==', reviewId));
    this.books = this.booksCol.valueChanges();
    return this.books;
  }

  getActiveBook(uid) {
    this.booksCol = this.db.collection('books', ref => ref.where('uid', '==', uid));
    this.books = this.booksCol.valueChanges();
    return this.books;
  }

  getEmployeesCollection() {
    this.employeesCol = this.db.collection('users', ref => ref.where('role', '==', 'employee'));
    this.employees = this.employeesCol.valueChanges();
    return this.employees;
  }

  updateReview(result) {
    console.log('updated review');
    const id = this.db.createId();
    this.db.doc(`reviews/${id}`).set({
      'q1' : result.q1,
      'q2' : result.q2,
      'q3' : result.q3,
      'q4' : result.q4,
      'q5' : result.q5,
      'q6' : result.q6,
      'q7' : result.q7,
      'q8' : result.q8,
      'q9' : result.q9,
      'employee' : 'Kylo ren',
      'book' : result.bookUID,
    });
  }


}
