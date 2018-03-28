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

  constructor(private db: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService, ) {
  }

  ngOnInit() {
    this.booksCol = this.db.collection('books');
    this.books = this.booksCol.valueChanges();
  }

  // downloadImage(imageURL:string){
  //   const ref = this.storage.ref('test/1519578506282_kaftceline1.png');
  //  // console.log(ref.getDownloadURL())
  //   return
  // }
}
