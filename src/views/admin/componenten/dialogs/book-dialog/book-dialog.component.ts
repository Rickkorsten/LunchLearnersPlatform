import { Component, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { HttpModule } from '@angular/http';
import { BooksService } from './../../../../../app/services/books/books.service';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.scss'],
  providers: [BooksService, HttpModule]
})
export class BookDialogComponent {

  books: any;
  selectedBook: any;
  keyword: string;

  title: string;
  subTitle: string;
  authors: string;
  smallThumbnail: string;
  bigThumbnail: string;
  publisher: string;
  publishDate: string;
  description: string;
  ISBN_13: string;
  ISBN_10: string;
  categories: string;
  imgFile: any;

  bookFound: boolean;

  constructor(
    private bookService: BooksService,
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
      this.bookFound = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
/// klopt niet
  getFile = (fileInput) => {
    return new Promise(resolve => {
      const file = fileInput.target.files[0];
      resolve(this.imgFile = file);
    });
  }



  searchBook(keyword) {
    this.bookService.searchBook(keyword)
      .map(books => books.json().items)
      .subscribe(async books => {
        this.books = await books;
      },
      () => console.log('geslaagd')
      );
  }

  async selectBook(book) {
    this.title = book.volumeInfo.title ?  book.volumeInfo.title : '';
    this.subTitle = book.volumeInfo.subtitle ? book.volumeInfo.subtitle : '';
    this.authors = book.volumeInfo.authors ? book.volumeInfo.authors.toString() : '';
    this.smallThumbnail = book.volumeInfo.imageLinks.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : '';
    this.bigThumbnail = book.volumeInfo.imageLinks.thumbnail ? book.volumeInfo.imageLinks.thumbnail : '';
    this.publisher = book.volumeInfo.publisher ? book.volumeInfo.publisher : '';
    this.publishDate = book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : '';
    this.description = book.volumeInfo.description ? book.volumeInfo.description : '';
    this.ISBN_13 = book.volumeInfo.industryIdentifiers[0].identifier ? book.volumeInfo.industryIdentifiers[0].identifier : '';
    this.ISBN_10 = book.volumeInfo.industryIdentifiers[1].identifier ? book.volumeInfo.industryIdentifiers[1].identifier : '';
    this.categories = book.volumeInfo.categories ? book.volumeInfo.categories.toString() : '';
    this.selectedBook = {
      'title': this.title,
      'subTitle': this.subTitle,
      'author': this.authors,
      'smallThumbnail': this.smallThumbnail,
      'bigThumbnail': this.bigThumbnail,
      'publisher': this.publisher,
      'publishDate': this.publishDate,
      'description': this.description,
      'ISBN_13': this.ISBN_13,
      'ISBN_10': this.ISBN_10,
      'categories': this.categories,
    };
  }

  generateBook() {
    return {
      'subTitle': this.subTitle,
      'author': this.authors,
      'smallThumbnail': this.smallThumbnail,
      'bigThumbnail': this.bigThumbnail,
      'publisher': this.publisher,
      'publishDate': this.publishDate,
      'description': this.description,
      'ISBN_13': this.ISBN_13,
      'ISBN_10': this.ISBN_10,
      'categories': this.categories,
    };
  }

  bookNotFound = () => {
    this.bookFound = false;
  }


}
