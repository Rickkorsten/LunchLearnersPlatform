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
  expanded = false;
  display: any;
  controleURL: any;


  constructor(
    private bookService: BooksService,
    private _sanitizer: DomSanitizer
  ) {
    this.video = '5iOhzJdDawE';
    this.bookService.activeBook.subscribe(book => this.book = book);
    this.bookService.displayVideo.subscribe(display => {
      if (display) {
        this.display = 'block';
      } else {
        this.display = 'none';
      }
    });
    this.bookService.activeVideoLink.subscribe(link => {
      this.safeURL = this._sanitizer
        .bypassSecurityTrustResourceUrl(link);
    });

    // this.bookService.activeVideoLink.subscribe
  }

  ngOnInit() {
  }

  goToTime(time) {
    this.safeURL = this._sanitizer
      .bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video}?start=${time}&autoplay=1&showinfo=0`);
  }

  expand() {
    if (!this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = false;
    }
  }

  close() {
    this.expanded = true;
    this.bookService.setDisplay(false);
  }

}
