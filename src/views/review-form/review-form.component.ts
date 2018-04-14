import { Component, OnInit } from '@angular/core';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  providers: [FirebaseCallsService]
})
export class ReviewFormComponent implements OnInit {

  book: any;
  rating1: number;

  constructor(private FirebaseCall: FirebaseCallsService) {
    console.log(this.rating1);
  }

  ngOnInit() {
    this.FirebaseCall.getBook('12345')
      .subscribe(book => {
        this.book = book[0];
      });
  }

}
