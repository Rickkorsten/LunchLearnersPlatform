import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Employee {
  name?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
  companyUid?: string;
  companyName?: string;
}

interface Company {
  name: string;
  code: string;
  users: string[];
  books: string[];
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
  bookUID?: string;
  employee?: number;
  questionArray?: string[];
  ratingArray?: number[];
  remark?: string;
  title?: string;
  generalRating?: number;
}

interface ReviewForm {
  0?: string;
  1?: number;
  2?: number;
  3?: number;
  4?: number;
  5?: number;
  6?: number;
  7?: number;
  8?: number;
  9?: number;
  10?: number;
  11?: number;
  12?: number;
  13?: number;
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
  // user
  usersArray: string[];
  newArray: string[];
  // reviewForm
  reviewformCol: AngularFirestoreCollection<ReviewForm>;
  reviewform: Observable<ReviewForm[]>;

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

  getcompany(uid) {
    this.companiesCol = this.db.collection('companies', ref => ref.where('uid', '==', uid));
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

  getBooksOfCompany(companyUid) {
    this.companiesCol = this.db.collection('companies', ref => ref.where('uid', '==', companyUid));
    this.companies = this.companiesCol.valueChanges();
    return this.companies;
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

  getReviewForm() {
    this.reviewformCol = this.db.collection('reviewform');
    this.reviewform = this.reviewformCol.valueChanges();
    return this.reviewform;
  }

  getUserByIUD(uid) {
    this.employeesCol = this.db.collection('users', ref => ref.where('uid', '==', uid));
    this.employees = this.employeesCol.valueChanges();
    return this.employees;
  }

  getReviewsByIUD(uid) {
    this.reviewsCol = this.db.collection('reviews', ref => ref.where('bookUID', '==', uid));
    this.reviews = this.reviewsCol.valueChanges();
    return this.reviews;
  }

  updateReview(result) {
    console.log('updated review');
    const id = this.db.createId();
    this.db.doc(`reviews/${id}`).set(
      result
    );
  }


}
