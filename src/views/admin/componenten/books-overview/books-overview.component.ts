import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { BookDialogComponent } from './../dialogs/book-dialog/book-dialog.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-books-overview',
  templateUrl: './books-overview.component.html',
  styleUrls: ['./books-overview.component.scss']
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

    constructor(private db: AngularFirestore, public dialog: MatDialog, private storage: AngularFireStorage, public auth: AuthService) {
      this.user == auth.user;
      console.log(this.user);
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
  }

  clearFields() {
    this.popupName = '';
    this.popupCover = '';
    this.popupDesc = '';
    this.popupPresentatieLink = '';
  }

  uploadBookToFirestore(data) {
    const id = this.db.createId();

    this.db.doc(`books/${id}`).set({
      'uid': id,
      'name': data.name,
      'cover': data.cover,
      'desc': data.desc,
      'reviewuid': this.reviewuid,
    })

  }

}
