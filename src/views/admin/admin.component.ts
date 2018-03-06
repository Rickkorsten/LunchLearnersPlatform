import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

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

  constructor(private db: AngularFirestore) {

  }

  ngOnInit() {
  }

  clearFields(){
    this.name = '';
    this.code = '';
    this.branche = '';
    this.emailsuffix = '';
  }

  uploadCompanyToFirestore() {

    const id = this.db.createId();

    this.db.doc(`company/${id}`).set({
      'uid': id,
      'name': this.name,
      'code': this.code,
      'branche': this.branche,
      'emailsuffix': this.emailsuffix,
      'users': this.users,
      'books': this.books,
    })

    this.clearFields();
    this.message = "uploaded";

  }

}

