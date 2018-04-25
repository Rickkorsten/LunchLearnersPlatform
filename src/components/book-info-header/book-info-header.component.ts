import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-info-header',
  templateUrl: './book-info-header.component.html',
  styleUrls: ['./book-info-header.component.scss']
})
export class BookInfoHeaderComponent implements OnInit {

  @Input() book: any;
  @Input() type: string; // can be 'large' or 'small'
  constructor() { }

  ngOnInit() {
    console.log(this.book);
  }

  checkDbOutput = (data: string) => {
    if (data === undefined) {
      return 'no data';
    } else {
      return data;
    }
  }

}
