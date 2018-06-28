import { Component, OnInit, Input, } from '@angular/core';

@Component({
  selector: 'app-book-card-mini',
  templateUrl: './book-card-mini.component.html',
  styleUrls: ['./book-card-mini.component.scss']
})


export class BookCardMiniComponent implements OnInit {

  @Input() book: any;
  @Input() title: any;
  @Input() error: any;

  constructor() {
  }

  ngOnInit() {
  }

}
