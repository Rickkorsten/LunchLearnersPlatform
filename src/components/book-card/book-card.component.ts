import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {

  @Input() book: string;
  @Input() type: string;

  hover: boolean;

  constructor() { }

  ngOnInit() {
    if (this.type === 'sidemenu') {
      this.hover = false;
    } else {
      this.hover = true;
    }
  }

}
