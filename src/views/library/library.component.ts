import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  providers: [FirebaseCallsService]
})
export class LibraryComponent implements OnInit {
  rating: number;
  books: any;

  constructor(
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService,
    private router: Router
  ) {
    this.rating = 3;
  }

  ngOnInit() {
    this.books = this.FirebaseCall.getBooksCollection();
    console.log(this.books);
  }

  toPresentationPage(book) {
    const compiledBook = JSON.stringify(book);
    this.router.navigate([`../bookpresentation/${book.uid}`, { book: compiledBook }]);
  }


}
