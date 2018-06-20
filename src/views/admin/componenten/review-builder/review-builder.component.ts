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
  inforQuestionsArray;
  forQuestionsArray;
  counter: number;
  type: string;
  index: number;

  questions: any;

  constructor(
    private db: AngularFirestore,
    private FirebaseCall: FirebaseCallsService,
    public snackBar: MatSnackBar,
  ) {
    this.inforQuestionsArray = [];

   }

  ngOnInit() {
    this.loadFormeel();
    this.loadInformeel();
  }

  addToQuestions(typearray, question) {
    typearray.push(question);
    this.question = '';
  }

  delete(typearray, item) {
    typearray = this.remove(typearray, item);
  }

  remove(arr, dele) {
    return arr.filter((el) => {
      return el !== dele;
    });
  }

  uploadForm(questionsArray) {

    switch ( this.index ) {
      case 0:
          this.type = 'formeel';
          break;
      case 1:
          this.type = 'informeel';
          break;
      default:
          this.type = 'formeel';
  }

    this.db.doc(`reviewform/${this.type}`).set({
      ...questionsArray
    });
    this.snackBar.open('formulier ge-update', '', {
      duration: 2000,
    });
  }

 // arrayToObject = (arr, keyField) => Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})));


  loadFormeel() {
    this.FirebaseCall.getReviewForm('formeel').subscribe(questions => {
      this.forQuestionsArray = Object.values(questions);
    });
  }

  loadInformeel() {
    this.FirebaseCall.getReviewForm('informeel').subscribe(questions => {
      this.inforQuestionsArray = Object.values(questions);
    });
  }

}
