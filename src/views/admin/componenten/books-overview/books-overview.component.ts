import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BookDialogComponent } from './../dialogs/book-dialog/book-dialog.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import 'rxjs/Rx'
import {HttpModule} from "@angular/http"
import {BooksService} from "./../../../../app/services/books/books.service"

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
  providers: [BooksService, HttpModule]
})

export class BooksOverviewComponent implements OnInit {

  user: any;

  popupName: string = '';
  popupCover: string = '';
  popupDesc: string = '';
  popupPresentatieLink: string = '';

  name: string;
  cover: string;
  desc: string;
  reviewuid: string[] = [];
  presentatielink: string;

  books: any;
  keyword:string = 'musk';

    constructor(private db: AngularFirestore, public dialog: MatDialog, private storage: AngularFireStorage, public auth: AuthService, private bookService:BooksService) {
      // this.user == auth.user;
      // console.log(this.user);
    }

    openDialog(): void {
      let dialogRef = this.dialog.open(BookDialogComponent, {
        width: '300px',
        data: {'name':this.popupName, 'cover':this.popupCover, 'desc': this.popupDesc, 'presentatielink': this.presentatielink }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.uploadBookToFirestore(result);
      });
    }

  ngOnInit() {
    this.searchBook('musk');
  }

  clearFields() {
    this.popupName = '';
    this.popupCover = '';
    this.popupDesc = '';
    this.popupPresentatieLink = '';
  }

  uploadBookToFirestore(result) {
    const id = this.db.createId();
    console.log("result : " + result.book.volumeInfo.title )

    this.db.doc(`books/${id}`).set({
      'uid': id,
      'title': result.book.volumeInfo.title,
      'smallCover': result.book.volumeInfo.imageLinks.smallThumbnail,
      'bigCover': result.book.volumeInfo.imageLinks.smallThumbnail,
      // 'description': result.book.volumeInfo.description,
      // 'categories': result.book.volumeInfo.categories,
      // 'authors': result.book.volumeInfo.authors,
      'publishedDate': result.book.volumeInfo.publishedDate,
      'reviewuid': this.reviewuid,
    })

  }

  searchBook(keyword) {
    console.log(this.keyword);
    this.bookService.searchBook(this.keyword)
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
