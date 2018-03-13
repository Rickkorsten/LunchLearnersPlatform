import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BookDialogComponent } from './../dialogs/book-dialog/book-dialog.component';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';
import 'rxjs/Rx'
import { HttpModule } from '@angular/http';
import { BooksService } from './../../../../app/services/books/books.service';

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

  name: string;
  cover: string;
  desc: string;
  reviewuid: string[] = [];
  presentatielink: string;

  booksCol: AngularFirestoreCollection<Book>;
  books: Observable<Book[]>;

  visible: boolean;

  constructor(private db: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService, ) {
    this.visible = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
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
    const { title, subTitle, smallThumbnail, bigThumbnail, publisher, publishDate, description,
      ISBN_13, ISBN_10, categories } = result.book;
    console.log(title);

    this.db.doc(`books/${id}`).set({
      'uid': id,
      'title': (title ? title : 'EMPTY'),
      'subTitle': (subTitle ? subTitle : 'EMPTY'),
      'smallThumbnail': (smallThumbnail ? smallThumbnail : 'EMPTY'),
      'bigThumbnail': (bigThumbnail ? bigThumbnail : 'EMPTY'),
      'publisher': (publisher ? publisher : 'EMPTY'),
      'publishDate': (publishDate ? publishDate : 'EMPTY'),
      'description': (description ? description : 'EMPTY'),
      'ISBN_13': (ISBN_13 ? ISBN_13 : 'EMPTY'),
      'ISBN_10': (ISBN_10 ? ISBN_10 : 'EMPTY'),
      'categories': (categories ? categories : 'EMPTY'),
    });

  }

  test() {
    console.log('open');
  }
}
