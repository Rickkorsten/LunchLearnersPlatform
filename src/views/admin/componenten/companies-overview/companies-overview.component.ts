import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CompanyDialogComponent } from './../dialogs/company-dialog/company-dialog.component';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';


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
  selector: 'app-companies-overview',
  templateUrl: './companies-overview.component.html',
  styleUrls: ['./companies-overview.component.scss']
})
export class CompanyListComponent implements OnInit {

  popupName: string;
  popupCode: string;
  popupBranche: string;
  popupEmailsuffix: string;
  popupUsers: string[] = [];
  popupBooks: string[] = [];
  popupMessage: string ;

  companiesCol: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;

  uid: string;
  name: string;
  code: string;
  branche: string;
  emailsuffix: string;
  books: string[];
  users: string[];

  constructor(private db: AngularFirestore, public dialog: MatDialog, public auth: AuthService) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CompanyDialogComponent, {
      width: '300px',
      data: { name: this.popupName, code: this.popupCode, branche: this.popupBranche, emailsuffix: this.popupEmailsuffix }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clearFields();
      this.uploadCompanyToFirestore(result);
    });
  }

  ngOnInit() {
    this.companiesCol = this.db.collection('companies');
    this.companies = this.companiesCol.valueChanges();
  }

  get(uid, name, code, branche, emailsuffix) {
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
    });

    console.log('updated');
  }

  delete() {
    this.db.doc(`companies/${this.uid}`).delete();
  }

  clearFields() {
    this.popupName = '';
    this.popupCode = '';
    this.popupBranche = '';
    this.popupEmailsuffix = '';
  }

  uploadCompanyToFirestore(data) {
    const id = this.db.createId();

    this.db.doc(`companies/${id}`).set({
      'uid': id,
      'name': data.name,
      'code': data.code,
      'branche': data.branche,
      'emailsuffix': data.emailsuffix,
      'users': this.popupUsers,
      'books': this.popupBooks,
    });

    this.clearFields();
    this.popupMessage = 'uploaded';

  }

}
