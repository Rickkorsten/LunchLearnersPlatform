import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// interface Book {
//   uid?: string;
//   title?: string;
//   subTitle?: string;
//   author?: string;
//   smallCover?: string;
//   publishedDate?: string;
//   description?: string;
//   categorie?: string;
//   publisher?: string;
//   videoLink?: string;
// }

@Injectable()
export class BooksService {

  search: string;

  private bookSource = new BehaviorSubject<object>({ 'object': 'object' });
  activeBook = this.bookSource.asObservable();

  private presentationSource = new BehaviorSubject<any>({ 'object': 'object' });
  activePresentation = this.presentationSource.asObservable();

  private videoLink = new BehaviorSubject<string>('');
  activeVideoLink = this.videoLink.asObservable();

  private displaySource = new BehaviorSubject<boolean>(false);
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

  public setActivePresentation(presentation: object) {
    this.presentationSource.next(presentation);
  }

  public setActiveVideoLink(video: string, time: string) {
    const URL = `https://www.youtube.com/embed/${video}?start=${time}&autoplay=1&showinfo=0`;
    this.videoLink.next(URL);
  }

  public setDisplay(bool) {
    this.displaySource.next(bool);
  }

}
