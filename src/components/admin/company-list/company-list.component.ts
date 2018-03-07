import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PostBookComponent } from './../../post-book/post-book.component';

import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../../app/core/auth.service';

interface Company {
  name: string;
  code: string;
  branche: string;
  emailsuffix: string;
  books: string[];
  users: string[];
  uid: string;

}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companiesCol: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;

  uid: string;
  name: string;
  code: string;
  branche: string;
  emailsuffix: string;
  books: string[];
  users: string[];

  user: any;
  constructor(private db: AngularFirestore, private storage: AngularFireStorage, public auth: AuthService) {
    this.user == auth.user;
    console.log(this.user);
  }

  ngOnInit() {
    this.companiesCol = this.db.collection('companies');
    this.companies = this.companiesCol.valueChanges();
  }

  get(uid,name,code,branche,emailsuffix){
    this.uid = uid;
    this.name = name;
    this.code = code ;
    this.branche = branche;
    this.emailsuffix = emailsuffix;
  }

  changeNameInput(input) {
    this.name = input;
  }

  changeCodeInput(input) {
    this.code = input;
  }

  changeBrancheInput(input) {
    this.branche = input;
  }

  changeEmailsuffixInput(input) {
    this.emailsuffix = input;
  }

  update() {
    this.db.doc(`companies/${this.uid}`).update({
      'name': this.name,
      'code': this.code,
      'branche': this.branche,
      'emailsuffix': this.emailsuffix,
    })

    console.log('updated')
  }

  delete() {
    this.db.doc(`companies/${this.uid}`).delete()
  }

}
