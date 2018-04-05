import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BooksService } from './../../app/services/books/books.service';
import { HttpModule } from '@angular/http';
import { MatDialog } from '@angular/material';
import { AuthService } from '../../app/core/auth.service';

interface Book {
  title: string;
  smallCover: string;
  publishedDate: string;
  uid: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
  providers: [BooksService, HttpModule]
})

export class StoreComponent implements OnInit {


  name: string;
  cover: string;
  desc: string;
  reviewuid: string[] = [];
  presentatielink: string;

  booksCol: AngularFirestoreCollection<Book>;
  books: Observable<Book[]>;

  searchResult: any;
  searchValue: string;

  constructor(
    private db: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private bookService: BooksService, ) {
  }

  ngOnInit() {
    this.booksCol = this.db.collection('books');
    this.books = this.booksCol.valueChanges();
    console.log(this.searchValue);
  }

  searchBook(result) {
    console.log(result);
    this.bookService.searchBook(result)
    .map(books => books.json().items)
    .subscribe(books => {
      this.searchResult = books;
     books.map(r => {
        console.log(r.searchInfo);
      });
    },
    () => console.log('geslaagd')
    );
  }

  // downloadImage(imageURL:string){
  //   const ref = this.storage.ref('test/1519578506282_kaftceline1.png');
  //  // console.log(ref.getDownloadURL())
  //   return
  // }
}
