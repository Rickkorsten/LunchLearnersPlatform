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
    } else {
      this.expanded = false;
    }
  }

  convertTime(time) {
    const hours   = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100;

    let result = (hours < 10 ? '0' + hours : hours);
        result += ':' + (minutes < 10 ? '0' + minutes : minutes);
        result += ':' + (seconds  < 10 ? '0' + seconds : seconds);
    return result;
  }

  close() {
    this.expanded = true;
    this.bookService.setDisplay(false);
    this.bookService.setActiveVideoLink('nothing', '0');
  }

}
