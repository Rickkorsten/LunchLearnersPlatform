import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BookDialogComponent } from './../dialogs/book-dialog/book-dialog.component';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';
import { SortEvent } from './../../../../app/directives/draggable/sortable-list.directive';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss'],
  providers: [FirebaseCallsService]
})

export class BooksOverviewComponent implements OnInit {

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  snapshot: Observable<any>;
  profileUrl: any;

  uid: any;
  books: any;
  subTitle: string;
  publisher: string;
  description: string;
  publishDate: string;
  categories: string;
  videoLink: string;
  preziLink: string;
  reviewId: string;

  sections: any;
  sectionsCount: number;

  employees: any;
  selectedEmployee: any;

  constructor(private db: AngularFirestore,
    public dialog: MatDialog,
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService,
    private afStorage: AngularFireStorage) {
    this.sectionsCount = 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async result => {
     const storageLink = result.imageFile ? await this.uploadToStorage(result.imageFile) : 'EMPTY';
     this.uploadBookToFirestore(result, storageLink);
    });
  }

  ngOnInit() {
    this.books = this.FirebaseCall.getBooksCollection();
    this.employees = this.FirebaseCall.getEmployeesCollection();
  }

  uploadToStorage(imageFile) {
    return new Promise (resolve => {
      const path = `images/${imageFile.name}`;
      this.ref = this.afStorage.ref(path);
      this.task = this.ref.put(imageFile);
      this.downloadURL = this.task.downloadURL();
      resolve(path);
    });
  }

  uploadBookToFirestore(result, storageLink) {
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
      'importImage' : (storageLink ? storageLink : 'EMPTY')
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
    this.preziLink = book.preziLink ? book.preziLink : '';
    this.reviewId = book.reviewId ? book.reviewId : '';
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
      'preziLink': (this.preziLink),
      'reviewId': (this.reviewId)
    })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  deleteBook() {
    this.db.doc(`books/${this.uid}`).delete();
  }

  async addToObject(title: string, time: string) {
    const id = this.db.createId();
    this.sections.push(
      {
        id: id,
        title: title,
        time: await this.convertToSeconds(time),
      }
    );
  }

  convertToSeconds(time) {
    const t = time.split(':');
    if (t.length > 2) {
      const seconds = (+t[0]) * 60 * 60 + (+t[1]) * 60 + (+t[2]);
      return seconds;
    } else {
      const seconds = (+t[0]) * 60 + (+t[1]);
      return seconds;
    }
  }

  deleteSection(id) {
    this.sections = this.sections.filter(function(object) {
     return object.id !== id;
  });
  }

  convertTime(time) {
    const hours   = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    // round seconds
    seconds = Math.round(seconds * 100) / 100;

    let result = (hours < 10 ? '0' + hours : hours);
        result += ':' + (minutes < 10 ? '0' + minutes : minutes);
        result += ':' + (seconds  < 10 ? '0' + seconds : seconds);
    return result;
  }

  sort(event: SortEvent) {
    const current = this.sections[event.currentIndex];
    const swapWith = this.sections[event.newIndex];

    this.sections[event.newIndex] = current;
    this.sections[event.currentIndex] = swapWith;
  }

  getURL(url) {
      console.log(url);
      // const ref = this.afStorage.ref(url);
      // this.profileUrl = ref.getDownloadURL().subscribe(newUrl => {
      //   console.log(newUrl);
      //   return newUrl;
      // });
  }

}
