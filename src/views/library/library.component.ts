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
  books: any;

  role: string;
  companyUid: string;

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
    this.books = this.FirebaseCall.getBooksCollection();
  }

  // async getUserData() {
  //   this.auth.user.subscribe(data => {
  //     this.role = data.role,
  //       this.companyUid = data.companyUid;
  //     if (this.companyUid) {
  //       this.FirebaseCall.getcompany(this.companyUid).subscribe(company => {
  //         this.company = company[0].name;
  //         this.companyBooks = company[0].books;
  //        this.companyBooks.map(uid => {
  //          this.FirebaseCall.getActiveBook(uid).subscribe(book => {
  //           this.allBooks.push(book[0]);
  //           console.log(this.allBooks);
  //          });
  //        });
  //       });
  //     }
  //   });
  // }

  toPresentationPage(book) {
    this.bookService.setActiveBook(book);
    this.router.navigate([`../bookpresentation/${book.uid}`]);
  }


}
