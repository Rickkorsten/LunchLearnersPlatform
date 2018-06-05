import { Component, OnInit } from '@angular/core';
import { BooksService } from './../../app/services/books/books.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDrawer } from '@angular/material';

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
  public drawer: MatDrawer;


  constructor(
    private bookService: BooksService,
    private _sanitizer: DomSanitizer
  ) {
    this.video = '5iOhzJdDawE';
    this.bookService.activePresentation.subscribe(book => this.book = book);
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
        this.expanded = true;
    });
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
      this.drawer.toggle();

    } else {
      this.expanded = false;
      this.drawer.toggle();
    }
  }

  close() {
    this.expanded = true;
    this.bookService.setDisplay(false);
    this.bookService.setActiveVideoLink('nothing', '0');
  }

}
