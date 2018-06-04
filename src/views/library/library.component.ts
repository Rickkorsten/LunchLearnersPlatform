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

  activeBook: any;
  isActiveBook: boolean;

  title: string;
  author: string;

  first: boolean;
  firstBook: any;

  constructor(
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService,
    private router: Router,
    private bookService: BooksService
  ) {
    this.rating = 3;
    this.allBooks = [];
<<<<<<< HEAD
    this.isActiveBook = false;
    this.first = false;
    // this.getUserData();
    // if (this.company && this.companyBooks) {
    //   console.log(this.company);
    // }
=======
>>>>>>> b23fb6b29b821f1ef85201051c067c9f90fa76fa
  }

  ngOnInit() {
    this.auth.user.subscribe(user => {
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
                  console.log(this.allBooks);
                  if (book[0] && !this.first) {
                    this.first = true;
                    this.setFirstBook(book[0]);
                  }
                });
              });
            }
          });
      }
    });
    this.bookService.activeBook.subscribe(book => {
        if (JSON.stringify(book) === '{"object":"object"}' ) {
          this.isActiveBook = false;
          console.log(false);
        } else {
          this.isActiveBook = true;
          this.activeBook = book;
          console.log(true);
        }
      }
     );

  }

  setFirstBook = (firstBook) => {
    console.log(firstBook);
    this.firstBook = firstBook;
    this.title = this.activeBook ? this.activeBook.title : firstBook.title;
    this.author = this.activeBook ? this.activeBook.author : firstBook.author;
  }

  toVideo() {
    this.bookService.setActivePresentation(this.activeBook ? this.activeBook : this.firstBook);
    this.bookService.setActiveVideoLink(this.activeBook ? this.activeBook.videoLink : this.firstBook.videoLink, '0');
    this.bookService.setDisplay(true);
  }


  toPresentationPage(book) {
    this.bookService.setActiveBook(book);
    this.router.navigate([`../bookpresentation/${book.uid}`]);
  }


}
