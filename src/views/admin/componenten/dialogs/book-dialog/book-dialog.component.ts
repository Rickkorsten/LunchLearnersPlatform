import { Component, Inject, } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VideoDropzoneComponent } from './../../../../../components/video-dropzone/video-dropzone.component';

import 'rxjs/Rx'
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { HttpModule } from "@angular/http"
import { BooksService } from "./../../../../../app/services/books/books.service"

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

  title:string;

  constructor(
    private bookService: BooksService,
    public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  searchBook(keyword) {
    console.log(keyword);
    if (keyword.length > 3) {
      this.bookService.searchBook(keyword)
        .map(books => books.json().items)
        .subscribe(books => {
          console.log(books);
          this.books = books
        },
        err => console.log('fout'),
        () => console.log('geslaagd')
        )
    }
  }

  selectBook(book) {
    this.title = book.volumeInfo.title;
    this.selectedBook = book

  }


}
