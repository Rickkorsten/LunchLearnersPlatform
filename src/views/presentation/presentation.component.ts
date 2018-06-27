import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ReviewDialogComponent } from './dialogs/review-dialog/review-dialog.component';
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
  rating: number;
  reviews: any;
  presentorName;
  bookName;

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private FirebaseCall: FirebaseCallsService,
    public dialog: MatDialog ) {
    this.counter = 0;
  }

  ngOnInit() {

    this.route.params.subscribe(params => this.activeBookUid = params.book);
    this.bookService.activeBook.subscribe(book => {
      this.book = book;
    });
    const stringedBook = JSON.stringify(this.book);

    if (stringedBook === '{"object":"object"}') {
      this.FirebaseCall.getActiveBook(this.activeBookUid.toString()).subscribe(book => {
        this.book = book[0];
        this.FirebaseCall.getSmallReviewsByUid(this.book.uid)
        .subscribe(reviews => this.reviews = reviews
          .filter(review => review.remark));
      });
    } else {
      this.FirebaseCall.getSmallReviewsByUid(this.book.uid).subscribe(reviews => this.reviews = reviews);
    }
  }

  getPresentorName(employee) {
    return new Promise(resolve => {
    this.FirebaseCall.getUserByIUD(employee).subscribe(user => {
      this.presentorName = user[0].name;
      console.log(this.presentorName);
      resolve(this.presentorName);
    } );
    });
  }

  getBookName(bookUid) {
    return new Promise(resolve => {
    this.FirebaseCall.getActiveBook(bookUid).subscribe(book => {
    this.bookName = book[0].title;
    console.log(this.bookName);
    resolve(this.bookName);
  });
  });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '600px',
      height: '612px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async result => {
        const extraInfo = {
          'bookUID': this.book.uid,
          'bookName': this.getBookName(this.book.uid),
        };
        const review = Object.assign(result, extraInfo);
        console.log(review);
        // bookUID
        this.FirebaseCall.setSmallReview(review);
    });
  }


  countSection() {
    this.counter++;
    const count = this.counter;
    return count;
  }

  toVideo(time) {
    this.bookService.setActivePresentation(this.book);
    this.bookService.setActiveVideoLink(this.book.videoLink, time);
    this.bookService.setDisplay(true);
  }
}
