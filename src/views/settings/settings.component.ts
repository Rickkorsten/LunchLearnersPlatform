
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import { BooksService } from './../../app/services/books/books.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

// rxjs operators
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

interface Company {
  name: string;
  branche: string;
}

interface User {
  name: string;
  city: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // company
  companiesCol: AngularFirestoreDocument<Company>;
  companies: Observable<Company[]>;
  companyBranche: string;
  companyName: string;
  // user data
  userUid: string;
  name: string;
  city: string;
  streetNumber: string;
  zipCode: string;
  email: string;
  // controlle
  passReset: boolean;
  controlleEmail: string;
  // messages
  passMessage: string;
  userMessage: string;

  bookUIDs: any;

  role: string;
  companyUid: string;
  companyBooks: string[];

  allBooks: any;

  constructor(private auth: AuthService,
    private db: AngularFirestore,
    private FirebaseCall: FirebaseCallsService,
    private router: Router,
    private bookService: BooksService,
    public snackBar: MatSnackBar) {
    this.passReset = false;
    this.allBooks = [];
  }

  ngOnInit() {
    this.getUserData();

    this.auth.user.subscribe(user => {
      console.log(user);
      this.role = user.role,
        this.companyUid = user.companyUid;
      if (this.companyUid) {
        this.FirebaseCall.getBooksOfCompany(this.companyUid)
          .subscribe(bookUIDs => {
            this.bookUIDs = bookUIDs[0].books;
            if (this.bookUIDs) {
              this.bookUIDs.map(bookUID => {
                this.FirebaseCall.getActiveBook(bookUID).subscribe(book => {
                  this.allBooks.push(book[0]);
                });
              });
            }
          });
      }
    });
  }


  getUserData() {
    this.auth.user.subscribe(data => {
      this.userUid = data.uid ? data.uid : '';
      this.companyName = data.companyName ? data.companyName : '';
      this.email = data.email ? data.email : '';
      this.name = data.name ? data.name : '';
      this.city = data.city ? data.city : '';
      this.streetNumber = data.streetNumber ? data.streetNumber : '';
      this.zipCode = data.zipCode ? data.zipCode : '';
    });
  }

  updateUser = (name: string, city: string) => {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.userUid}`);

    const UserUpdate: User = {
      name: name,
      city: city,
    };
    userRef.set(UserUpdate, { merge: true });
    this.snackBar.open('formulier ge-update', '', {
      duration: 2000,
    });
  }

  resetPassword() {
    if (this.controlleEmail === undefined) {
      return this.controlleEmail = 'Geen geldige email ingevuld';
    }
    this.auth.resetPassword(this.email)
      .then(() => this.passReset = this.email === this.controlleEmail ? true : false);
    this.passMessage = 'Er is een bericht verzonden naar je Email';
  }

  toPresentationPage(book) {
    this.bookService.setActiveBook(book);
    this.router.navigate([`../bookpresentation/${book.uid}`]);
  }

}


