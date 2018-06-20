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
        this.FirebaseCall.getReviewsByIUD(this.book.uid)
        .subscribe(reviews => this.reviews = reviews
          .filter(review => review.remark));
      });
      this.getPresentorName(this.book.employee);
      this.getBookName(this.book.uid);
    } else {
      this.FirebaseCall.getReviewsByIUD(this.book.uid).subscribe(reviews => this.reviews = reviews);
      this.getPresentorName(this.book.employee);
      this.getBookName(this.book.uid);
    }
  }

  getPresentorName(employee): void {
    this.FirebaseCall.getUserByIUD(employee).subscribe(user => this.presentorName = user[0].name ? user[0].name : user[0].companyName );
  }

  getBookName(bookUid): void {
    this.FirebaseCall.getActiveBook(bookUid).subscribe(book => this.bookName = book[0].title);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '600px',
      height: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      const extraInfo = {
        'book': this.bookName, 'bookUID': this.book.uid, 'employee': this.presentorName, 'employeeUID': this.book.employee
      };
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
