import { Component, OnInit } from '@angular/core';
import { BooksService } from './../../app/services/books/books.service';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements OnInit {
  book: any;
  counter: number;
  activeBookUid: any;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private FirebaseCall: FirebaseCallsService, ) {

    this.counter = 0;
    this.route.params.subscribe( params => this.activeBookUid = params.book );
  }

  ngOnInit() {
    this.bookService.activeBook.subscribe(book => this.book = book);
    const stringedBook = JSON.stringify(this.book);
    if (stringedBook === '{"object":"object"}') {
    this.FirebaseCall.getActiveBook(this.activeBookUid.toString()).subscribe(book => {
       this.book = book[0];
     });
    } else {
      console.log('take info from service');
    }
  }

  countSection() {
    this.counter++;
    const count = this.counter;
    return count;
  }

  toVideo(time) {
    this.bookService.setActiveVideoLink(this.book.videoLink, time);
    this.bookService.setDisplay(true);
  }
}
