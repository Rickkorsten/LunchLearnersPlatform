import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

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

  error: string;
  questionsArray: any;
  generalRating: number;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private FirebaseCall: FirebaseCallsService,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
  }

  ngOnInit() {
    this.FirebaseCall.getReviewForm('formeel').subscribe(questions => {
      questions.map(question => {
        this.questionsArray = Object.values(question);
        console.log(this.questionsArray);
        this.remark = '';
        this.title = '';
        this.generalRating = 0;
      });
    });
  }

  accept(): void {

    console.log(this.rating8);
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

    const review = Object.assign(object, smallReview);
    console.log(review);
     this.dialogRef.close(object);
  }
}
