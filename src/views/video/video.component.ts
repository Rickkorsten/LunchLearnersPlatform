import { Component, OnInit } from '@angular/core';
import { BooksService } from './../../app/services/books/books.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  book: object;

  constructor(
    private bookService: BooksService
  ) { }

  ngOnInit() {
    this.bookService.activeBook.subscribe(book => this.book = book);
  }

}
