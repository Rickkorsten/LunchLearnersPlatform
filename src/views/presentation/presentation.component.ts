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

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private FirebaseCall: FirebaseCallsService,
    public dialog: MatDialog ) {
    this.counter = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.activeBookUid = params.book);
    this.bookService.activeBook.subscribe(book => this.book = book);
    const stringedBook = JSON.stringify(this.book);

    if (stringedBook === '{"object":"object"}') {
      this.FirebaseCall.getActiveBook(this.activeBookUid.toString()).subscribe(book => {
        this.book = book[0];
        this.FirebaseCall.getReviewsByIUD(this.book.uid)
        .subscribe(reviews => this.reviews = reviews
          .filter(review => review.remark));
      });
    } else {
      this.FirebaseCall.getReviewsByIUD(this.book.uid).subscribe(reviews => this.reviews = reviews);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '600px',
      height: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      const extraInfo = { 'bookUID': this.book.uid, 'employee': this.book.employee };
      const review = Object.assign(result, extraInfo);
      // bookUID
      this.FirebaseCall.updateReview(review);
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
