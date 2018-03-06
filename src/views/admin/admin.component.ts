import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { CompanyDialogComponent } from '../../components/company-dialog/company-dialog.component';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

  name: string;
  code: string;
  branche: string;
  emailsuffix: string;
  users: string[] = [];
  books: string[] = [];
  message: string = '';

  constructor(private db: AngularFirestore, public dialog: MatDialog, private storage: AngularFireStorage) { }

  openDialog(): void {
    let dialogRef = this.dialog.open(CompanyDialogComponent, {
      width: '350px',
      height: '450px',
      data: { name: this.name, code: this.code, branche: this.branche, emailsuffix: this.emailsuffix }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clearFields();
      this.uploadCompanyToFirestore(result);
    });
  }


  ngOnInit() {
  }

  clearFields() {
    this.name = '';
    this.code = '';
    this.branche = '';
    this.emailsuffix = '';
  }

  uploadCompanyToFirestore(data) {
    const id = this.db.createId();

    this.db.doc(`companies/${id}`).set({
      'uid': id,
      'name': data.name,
      'code': data.code,
      'branche': data.branche,
      'emailsuffix': data.emailsuffix,
      'users': this.users,
      'books': this.books,
    })

    this.clearFields();
    this.message = "uploaded";

  }

}


