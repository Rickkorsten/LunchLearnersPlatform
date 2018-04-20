import { Component, OnInit } from '@angular/core';
import { BooksService } from './../../app/services/books/books.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
})
export class VideoComponent implements OnInit {

  book: object;
  safeURL: any;
  video: string;
  time: string;


  constructor(
    private bookService: BooksService,
    private _sanitizer: DomSanitizer
  ) {
    this.video = 'zngjlT_Ka3U';
    this.bookService.activeBook.subscribe(book => this.book = book);
    this.bookService.activeTime.subscribe(time => this.time = time);
  }

  ngOnInit() {
    // video url
    this.safeURL = this._sanitizer
    .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video}?start=${this.time}&autoplay=1`);
  }

  goToTime(time) {
    this.safeURL = this._sanitizer
    .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video}?start=${time}&autoplay=1`);
  }


}
