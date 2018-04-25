import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-builder',
  templateUrl: './review-builder.component.html',
  styleUrls: ['./review-builder.component.scss']
})
export class ReviewBuilderComponent implements OnInit {

  question: string;
  questionsArray: string[];

  constructor() {
    this.questionsArray = [];
   }

  ngOnInit() {
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

}
