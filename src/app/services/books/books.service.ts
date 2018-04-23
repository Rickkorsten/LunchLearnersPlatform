import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BooksService {

  search: string;

  private bookSource = new BehaviorSubject<object>({ 'object': 'object' });
  activeBook = this.bookSource.asObservable();

  private timeSource = new BehaviorSubject<string>('20');
  activeTime = this.timeSource.asObservable();

  private videoLink = new BehaviorSubject<string>('baida');
  activeVideoLink = this.videoLink.asObservable();

  private displaySource = new BehaviorSubject<boolean>(true);
  displayVideo = this.displaySource.asObservable();

  constructor(private http: Http) {
  }

  searchBook(keyword) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&country=DK`;
    return this.http.get(url);
  }

  public setActiveBook(book: object) {
    this.bookSource.next(book);
  }

  public setStartTime(time: string) {
    this.timeSource.next(time);
  }

  public setActiveVideoLink(time: string) {
    const URL = (`https://www.youtube.com/embed/0ihzH6bCCms?start=${time}&autoplay=0&showinfo=0`);
    this.timeSource.next(URL);
  }

  public setDisplay() {
    let displayed;
    this.displayVideo.subscribe(display => displayed = display);
    if (!displayed) {
      this.displaySource.next(true);
    } else {
      this.displaySource.next(false);
    }
  }

  // public toggleDisplayVideo() {
  //   if (!this.displayVideo) {
  //     this.displayVideo = true;
  //   } else {
  //     this.displayVideo = false;
  //   }
  // }

}
