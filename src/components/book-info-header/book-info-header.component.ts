import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import { BooksService } from './../../app/services/books/books.service';

@Component({
  selector: 'app-book-info-header',
  templateUrl: './book-info-header.component.html',
  styleUrls: ['./book-info-header.component.scss']
})
export class BookInfoHeaderComponent implements OnInit {

  @Input() book: any;
  @Input() type: string; // can be 'large' or 'small'


  presentor: string;
  rating: number;
  generalRating: any;

  constructor(
    private bookService: BooksService,
    private FirebaseCall: FirebaseCallsService) {
      this.generalRating = [];
     }

  async ngOnInit() {
    if (this.book) {
      console.log(this.book);
      this.FirebaseCall.getUserByIUD(this.book.employee)
      .subscribe(user => this.presentor = user[0].name ? user[0].name : user[0].companyName );
      console.log(this.presentor);

       // get avg
    this.rating = this.calcAvg(await this.getRating(this.book.uid));
    }
  }

  checkDbOutput = (data: string) => {
    if (data === undefined) {
      return 'no data';
    } else {
      return data;
    }
  }

  calcAvg(arr) {
    return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
  }

  getRating = (uid) => {
    console.log('uid : ' + uid);
    return new Promise(resolve => {
    this.FirebaseCall.getReviewsByIUD(uid)
    .subscribe(reviews => reviews
      .filter(review => {
        this.generalRating.push(review.generalRating);
       resolve(this.generalRating);
      }
      ));
    });
  }

  toVideo() {
    this.bookService.setActivePresentation(this.book);
    this.bookService.setActiveVideoLink(this.book.videoLink, '0');
    this.bookService.setDisplay(true);
  }

}
