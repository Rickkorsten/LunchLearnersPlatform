import { Component, OnInit } from '@angular/core';
import { BooksService } from './../../app/services/books/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements OnInit {
  book: any;
  counter: number;
  constructor(
    private bookService: BooksService,
    private router: Router, ) {
    this.counter = 0;
  }

  ngOnInit() {
    this.bookService.activeBook.subscribe(book => this.book = book);
    console.log(this.book);
  }

  countSection() {
    this.counter++;
    const count = this.counter;
    return count;
  }

  toVideo() {
    this.router.navigate([`../video/${this.book.uid}`]);
  }
}
