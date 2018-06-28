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
  QuestionsArray1;
  QuestionsArray2;
  counter: number;
  type: string;
  index: number;

  questions1: any;
  questions2: any;

  constructor(
    private db: AngularFirestore,
    private FirebaseCall: FirebaseCallsService,
    public snackBar: MatSnackBar,
  ) {
    this.QuestionsArray1 = [];
    this.QuestionsArray2 = [];

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
          this.type = '1';
          break;
      case 1:
          this.type = '2';
          break;
      default:
          this.type = '1';
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
    this.FirebaseCall.getReviewForm('1').subscribe(questions => {
      this.QuestionsArray1 = Object.values(questions);
    });
  }

  loadInformeel() {
    this.FirebaseCall.getReviewForm('2').subscribe(questions => {
      this.QuestionsArray2 = Object.values(questions);
    });
  }

}
