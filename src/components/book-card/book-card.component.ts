import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: any;
  @Input() type: string;

  hover: boolean;
  rating: number;
  generalRating: any;

  constructor(  private FirebaseCall: FirebaseCallsService ) {
    this.generalRating = [];
   }

  async ngOnInit() {
    if (this.type === 'sidemenu') {
      this.hover = false;
    } else {
      this.hover = true;
    }

    // get avg
    this.rating = this.calcAvg(await this.getRating(this.book.uid));
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

  checkTitle(title) {
    console.log(title.length);
    if (title.length > 21 ) {
      const shortTitle = title.slice(0, 18);
      return `${shortTitle}...`;
    } else {
      return title;
    }

  }

}
