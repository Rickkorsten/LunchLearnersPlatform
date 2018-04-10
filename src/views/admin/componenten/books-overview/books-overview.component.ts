import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BookDialogComponent } from './../dialogs/book-dialog/book-dialog.component';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
  providers: [FirebaseCallsService]
})

export class BooksOverviewComponent implements OnInit {

  books: any;

  name: string;
  cover: string;
  desc: string;
  reviewuid: string[] = [];
  presentatielink: string;

  constructor(private db: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService ) {
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
    this.books = this.FirebaseCall.getBooksCollection();
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
