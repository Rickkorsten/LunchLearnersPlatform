import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BooksService {

  search:string;

  constructor(private http: Http) {

  }

  searchBook(keyword){
    let url= `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
    return this.http.get(url);
  }

}
