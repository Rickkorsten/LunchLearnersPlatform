import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import { BooksService } from './../../app/services/books/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  rating: number;
  bookUIDs: any;

  role: string;
  companyUid: string;
  companyName: string;

  company: any;
  companyBooks: string[];
  allBooks: any;

  constructor(
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService,
    private router: Router,
    private bookService: BooksService
  ) {
    this.rating = 3;
    this.allBooks = [];
    // this.getUserData();
    // if (this.company && this.companyBooks) {
    //   console.log(this.company);
    // }
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      console.log(user);
      this.role = user.role,
      this.companyName = user.companyName;
        this.companyUid = user.companyUid;
      if (this.companyUid) {
        this.FirebaseCall.getBooksOfCompany(this.companyUid)
          .subscribe(bookUIDs => {
            this.bookUIDs = bookUIDs[0].books;
            if (this.bookUIDs) {
              this.bookUIDs.map(bookUID => {
                this.FirebaseCall.getActiveBook(bookUID).subscribe(book => { // get book by uid (function name is wrong)
                  this.allBooks.push(book[0]);
                });
              });
            }
          });
      }
    });
  }


  toPresentationPage(book) {
    this.bookService.setActiveBook(book);
    this.router.navigate([`../bookpresentation/${book.uid}`]);
  }


}
