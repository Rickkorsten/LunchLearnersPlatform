import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PostBookComponent } from '../../components/post-book/post-book.component';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../app/core/auth.service';

interface Company {
  name: string;
  code: string;
  branche: string;
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companiesCol: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;

  name: string;
  code: string;
  branche: string;

  user: any;


  constructor(private db: AngularFirestore, private storage: AngularFireStorage, public auth: AuthService) {
    this.user == auth.user;
    console.log(this.user);
  }

  ngOnInit() {
    this.companiesCol = this.db.collection('companies');
    this.companies = this.companiesCol.valueChanges();
  }
}
