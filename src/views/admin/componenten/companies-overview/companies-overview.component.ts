import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { CompanyDialogComponent } from './../dialogs/company-dialog/company-dialog.component';
import { AuthService } from '../../../../app/core/auth.service';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';
import { MatDialog, MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-companies-overview',
  templateUrl: './companies-overview.component.html',
  styleUrls: ['./companies-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

  popupName: string;
  popupCode: string;
  popupBranche: string;
  popupEmailsuffix: string;
  popupUsers: string[] = [];
  popupBooks: string[] = [];
  popupMessage: string;

  companies: any;
  allBooks: any;

  uid: string;
  name: string;
  code: string;
  branche: string;
  emailsuffix: string;
  books: any;
  users: any;

  selectedBooks: string;
  companyBooksArray: string[];
  allBranches: string[];

  constructor(
    private db: AngularFirestore,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService) {
      this.allBranches = [
        'Bouw en Vastgoed',
        'Communicatie en Media',
        'Consultancy',
        'Energiebedrijven',
        'Facilitaire dienstverlening',
        'Fast Moving Consumer Goods',
        'Financiële dienstverlening',
        'Financiële instellingen',
        'Gezondheidszorg en welzijnszorg',
        'Handel en retail',
        'Horeca, Recreatie, Toerisme en Cultuur',
        'Industrie',
        'Informatie en Communicatie Technologie (ICT)',
        'Intermediairs',
        'Juridische dienstverlening',
        'Land- en tuinbouw',
        'Onderwijs en Onderzoek',
        'Overheid en semi-overheid',
        'Technische dienstverlening',
        'Telecommunicatie',
        'Transport en Logistiek'
      ];
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
    this.companies = this.FirebaseCall.getCompaniesCollection();
    this.allBooks = this.FirebaseCall.getBooksCollection();
  }

  async get(uid, name, code, branche, emailsuffix, books, users) {
    this.uid = uid ? uid : '';
    this.name = name ? name : '';
    this.code = code ? code : '';
    this.branche = branche ? branche : '';
    this.emailsuffix = emailsuffix ? emailsuffix : '';
    this.companyBooksArray = await books ? books : [];
    this.users =  await this.getEmailOfUserUID(users);
    this.books = this.getTitleOfBooksUID(this.companyBooksArray);
  }

  getEmailOfUserUID(users) {
    return new Promise(resolve => {
    const usersArray = [];
    users.map(user => {
      this.FirebaseCall.getUserByIUD(user).subscribe(data => resolve(usersArray.push(data[0].email)));
    });
  });
  }

  getTitleOfBooksUID(books) {
    return new Promise(resolve => {
    const booksArray = [];
    books.map(user => {
      this.FirebaseCall.getBookByUID(user).subscribe(data => resolve(booksArray.push({'title': data[0].title, 'uid': data[0].uid})));
    });
  });
  }

  update() {
    this.db.doc(`companies/${this.uid}`).update({
      'name': this.name,
      'code': this.code,
      'branche': this.branche,
      'emailsuffix': this.emailsuffix,
      'books': this.companyBooksArray
    });

    this.snackBar.open('bedrijfs informatie ge-update', '', {
      duration: 2000,
    });

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

  updateBookArray(book) {
    this.companyBooksArray.push(book);
    this.books = this.getTitleOfBooksUID(this.companyBooksArray);
  }

  async deleteBook(item) {
    this.companyBooksArray = this.remove(this.companyBooksArray, item.uid);
    this.books = await this.getTitleOfBooksUID(this.companyBooksArray);
  }

  remove(arr, dele) {
    return arr.filter((el) => {
      return el !== dele;
    });
  }

}
