import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-review-builder',
  templateUrl: './review-builder.component.html',
  styleUrls: ['./review-builder.component.scss']
})
export class ReviewBuilderComponent implements OnInit {

  question: string;
  questionsArray: string[];
  counter: number;

  questions: any;

  constructor(
    private db: AngularFirestore,
    private FirebaseCall: FirebaseCallsService,
    public snackBar: MatSnackBar,
  ) {
    this.questionsArray = [];

   }

  ngOnInit() {
    this.FirebaseCall.getReviewForm().subscribe(questions => {
      questions.map(question => {
        this.questionsArray = Object.values(question);
      });
    });
  }

  addToQuestions(question) {
   this.questionsArray.push(question);
    this.question = '';
  }

  delete(item) {
    this.questionsArray = this.remove(this.questionsArray, item);
  }

  remove(arr, dele) {
    return arr.filter((el) => {
      return el !== dele;
    });
  }

  uploadForm(questionsArray) {
    this.db.doc(`reviewform/form`).set({
      ...questionsArray
    });
    this.snackBar.open('formulier ge-update', '', {
      duration: 2000,
    });
  }

  arrayToObject = (arr, keyField) => Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));

}
