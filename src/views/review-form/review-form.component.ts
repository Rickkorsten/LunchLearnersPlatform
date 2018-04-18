import { Component, OnInit } from '@angular/core';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  providers: [FirebaseCallsService]
})
export class ReviewFormComponent implements OnInit {
  bookCode: string;
  book: any;
  rating1: number;
  error: string;

  constructor(
    private FirebaseCall: FirebaseCallsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookCode = JSON.parse(params['bookcode']);
      if (this.bookCode) {
        this.FirebaseCall.getBook(this.bookCode.toString())
          .subscribe(book => {
            this.book = book[0];
          });
      }
    });
  }

  uploadReview(q1, q2, q3, q4, q5, q6, q7, q8, q9) {

    const bookUID = this.book.uid;
    console.log('UID ' + bookUID);

    if (q1 || q2 || q3 || q4 || q5 || q6 || q7 || q8 || q9 === undefined) {
      console.log('baida');
      this.error = 'Er is een veld niet ingevuld';
    }
    if (q1 || q2 || q3 || q4 || q5 || q6 || q7 || q8 || q9) {
      this.error = '';
      const results: object = { q1, q2, q3, q4, q5, q6, q7, q8, q9, bookUID };
      this.FirebaseCall.updateReview(results);
    }
  }

}
