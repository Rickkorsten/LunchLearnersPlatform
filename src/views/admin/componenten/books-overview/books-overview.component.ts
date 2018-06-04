import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BookDialogComponent } from './../dialogs/book-dialog/book-dialog.component';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';
import { SortEvent } from './../../../../app/directives/draggable/sortable-list.directive';
@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
  providers: [FirebaseCallsService]
})

export class BooksOverviewComponent implements OnInit {

  uid: any;
  books: any;
  subTitle: string;
  publisher: string;
  description: string;
  publishDate: string;
  categories: string;
  videoLink: string;

  sections: any;
  sectionsCount: number;

  employees: any;
  selectedEmployee: any;

  constructor(private db: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService) {
    this.sectionsCount = 0;
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
    this.employees = this.FirebaseCall.getEmployeesCollection();
  }

  uploadBookToFirestore(result) {
    const id = this.db.createId();
    const { title, subTitle, author, smallThumbnail, bigThumbnail, publisher, publishDate, description,
      ISBN_13, ISBN_10, categories } = result.book;

    this.db.doc(`books/${id}`).set({
      'uid': id,
      'title': (title ? title : 'EMPTY'),
      'subTitle': (subTitle ? subTitle : 'EMPTY'),
      'author': (author ? author : 'EMPTY'),
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

  getBook(book) {
    this.uid = book.uid;
    this.subTitle = book.subTitle;
    this.publisher = book.publisher;
    this.publishDate = book.publishDate;
    this.description = book.description;
    this.categories = book.categories;
    this.sections = book.sections ? book.sections : [] ;
    this.selectedEmployee = book.employee ? book.employee : 'selecteer presentator';
    this.videoLink = book.videoLink ? book.videoLink : '';
  }

  updateBook() {
    this.db.doc(`books/${this.uid}`).update({
      'subTitle': (this.subTitle),
      'publisher': (this.publisher),
      'publishDate': (this.publishDate),
      'description': (this.description),
      'categories': (this.categories),
      'sections': (this.sections),
      'employee': (this.selectedEmployee),
      'videoLink': (this.videoLink),
    })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  deleteBook() {
    this.db.doc(`books/${this.uid}`).delete();
  }

  addToObject(title: string, time: string) {
    const id = this.db.createId();
    this.sections.push(
      {
        id: id,
        title: title,
        time: time,
      }
    );
  }

  sort(event: SortEvent) {
    const current = this.sections[event.currentIndex];
    const swapWith = this.sections[event.newIndex];

    this.sections[event.newIndex] = current;
    this.sections[event.currentIndex] = swapWith;
  }

}
