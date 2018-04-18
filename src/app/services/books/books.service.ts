import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BooksService {

  search: string;

  private bookSource = new BehaviorSubject<object>({'object': 'object'});
  activeBook = this.bookSource.asObservable();

  constructor(private http: Http) {

  }

  searchBook(keyword) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${keyword}&country=DK`;
    return this.http.get(url);
  }

  public setActiveBook(book: object) {
    this.bookSource.next(book);
  }

}
