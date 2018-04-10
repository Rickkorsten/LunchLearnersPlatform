import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

interface Book {
  title: string;
  smallCover: string;
  publishedDate: string;
  description: string;
  categorie: string;
  publisher: string;

}

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})

export class BookInfoComponent implements OnInit {
  bookUid: string;
  bookTitle: string;
  bookDescription: string;
  bookImg: string;
  bookCategorie: String;
  bookPublisher: String;
  bookPublishedDate: String;

  bookCol: AngularFirestoreCollection<Book>;
  book: Observable<Book[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookUid = params['uid'];
      console.log(this.bookUid);

      const user = JSON.parse(localStorage.getItem('user'));
      console.log('user :' + user);

   });
   //////////// in function zetten
   this.bookCol = this.db.collection('books', ref => ref.where('uid', '==', this.bookUid));
   this.book = this.bookCol.valueChanges();
   // hier pak je een book ! je kan ook in het html file een *ngFor gebruiken.
   this.book.subscribe(data => {
    this.bookTitle = data[0].title;
    this.bookDescription = data[0].description;
    this.bookImg = data[0].smallCover;
    this.bookCategorie = data[0].categorie;
    this.bookPublisher = data[0].publisher;
    this.bookPublishedDate = data[0].publishedDate;
   });
  }

}
