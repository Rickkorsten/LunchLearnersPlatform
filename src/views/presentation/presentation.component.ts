import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  book: any;
  counter: number;
  constructor(private route: ActivatedRoute, ) {
    this.counter = 0;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.book = JSON.parse(params['book']);
    });
  }

  checkDbOutput = (data: string) => {
    if (data === undefined) {
      return 'no data';
    } else {
      return data;
    }
  }

  countSection() {
    this.counter++;
    const count = this.counter;
    return count;
  }
}
