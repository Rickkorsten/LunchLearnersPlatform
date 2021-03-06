import { Component, OnInit } from '@angular/core';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
  providers: [FirebaseCallsService]
})
export class ReviewFormComponent implements OnInit {
  bookCode: any;
  formType: any;
  book: any;
  error: string;

  rating0: number;
  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
  rating6: number;
  rating7: number;
  rating8: number;
  rating9: number;
  remark: string;
  title: string;

  questionsArray: any;
  generalRating: number;
  presentorName;
  bookName;

  constructor(
    private FirebaseCall: FirebaseCallsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const bookCode = params['bookcode'];
      this.bookCode = bookCode.substring(0, bookCode.lastIndexOf('+') + 1);
      this.formType = bookCode.substring(bookCode.lastIndexOf('+') + 1, bookCode.length);
      console.log(this.bookCode);
      console.log(this.formType);

      if (this.bookCode && this.formType) {
        this.FirebaseCall.getBook(this.bookCode.toString())
          .subscribe( async book => {
            this.book = book[0];
            if (this.book) {
              await this.getPresentorName(this.book.employee);
              await this.getBookName(this.book.uid);
            }
          });

          this.FirebaseCall.getReviewForm(this.formType).subscribe(question => {
            this.questionsArray = Object.values(question);
              this.remark = '';
              this.title = '';
              this.generalRating = 0;
          });
      }
    });
  }

  getPresentorName(employee): void {
    this.FirebaseCall.getUserByIUD(employee).subscribe(user => this.presentorName = user[0].name ? user[0].name : user[0].companyName );
  }

  getBookName(bookUid): void {
    this.FirebaseCall.getActiveBook(bookUid).subscribe(book => this.bookName = book[0].title);
  }

  accept(): void {
    let ratingArray = [
      this.rating0 ? this.rating0 : undefined,
      this.rating1 ? this.rating1 : undefined,
      this.rating2 ? this.rating2 : undefined,
      this.rating3 ? this.rating3 : undefined,
      this.rating4 ? this.rating4 : undefined,
      this.rating5 ? this.rating5 : undefined,
      this.rating6 ? this.rating6 : undefined,
      this.rating7 ? this.rating7 : undefined,
      this.rating8 ? this.rating8 : undefined,
      this.rating9 ? this.rating9 : undefined,
    ];

    let questionArray = [
      this.questionsArray[0] ? this.questionsArray[0] : undefined,
      this.questionsArray[1] ? this.questionsArray[1] : undefined,
      this.questionsArray[2] ? this.questionsArray[2] : undefined,
      this.questionsArray[3] ? this.questionsArray[3] : undefined,
      this.questionsArray[4] ? this.questionsArray[4] : undefined,
      this.questionsArray[5] ? this.questionsArray[5] : undefined,
      this.questionsArray[6] ? this.questionsArray[6] : undefined,
      this.questionsArray[7] ? this.questionsArray[7] : undefined,
      this.questionsArray[8] ? this.questionsArray[8] : undefined,
      this.questionsArray[9] ? this.questionsArray[9] : undefined,
    ];

    ratingArray = ratingArray.filter(n => n !== undefined );
    questionArray = questionArray.filter(n =>  n !== undefined );
    const object = { ratingArray, questionArray };
    const smallReview = {'title': this.title, 'remark': this.remark, 'generalRating' : this.generalRating};
    const extraInfo = {'book': this.bookName, 'bookUID': this.book.uid, 'employee': this.presentorName, 'employeeUID': this.book.employee };
    const review = Object.assign(object, smallReview, extraInfo);
    this.FirebaseCall.updateReview(review);
    this.snackBar.open('Review formulier ge-update', '', {
      duration: 2000,
    });
  }

}
