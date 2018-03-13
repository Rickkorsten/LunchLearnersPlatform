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

interface Book {
  title: string;
  smallCover: string;
  publishedDate: string;
}

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
  providers: [BooksService, HttpModule]
})

export class BooksOverviewComponent implements OnInit {

  user: any;


  name: string;
  cover: string;
  desc: string;
  reviewuid: string[] = [];
  presentatielink: string;

  booksCol: AngularFirestoreCollection<Book>;
  books: Observable<Book[]>;

    constructor(private db: AngularFirestore, public dialog: MatDialog, private storage: AngularFireStorage, public auth: AuthService, private bookService:BooksService) {
      // this.user == auth.user;
      // console.log(this.user);
    }

    openDialog(): void {
      let dialogRef = this.dialog.open(BookDialogComponent, {
        width: '400px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.uploadBookToFirestore(result);
      });
    }

  ngOnInit() {
    this.booksCol = this.db.collection('books');
    this.books = this.booksCol.valueChanges();
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
}
