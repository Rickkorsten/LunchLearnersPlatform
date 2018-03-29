
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

// rxjs operators
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

interface Company {
  name: string;
  branche: string;
}

interface User {
  name: string;
  city: string;
  streetNumber: string;
  zipCode: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // company
  companiesCol: AngularFirestoreDocument<Company>;
  companies: Observable<Company[]>;
  companyBranche: string;
  companyName: string;
  // user data
  userUid: string;
  name: string;
  city: string;
  streetNumber: string;
  zipCode: string;
  email: string;
  // controlle
  passReset: boolean;
  controlleEmail: string;
  // messages
  passMessage: string;
  userMessage: string;


  constructor(private auth: AuthService, private db: AngularFirestore) {
    this.passReset = false;
  }

  ngOnInit() {
    this.getUserData();
  }


  getUserData() {
    this.auth.user.subscribe(data => {
      this.userUid = data.uid ? data.uid : '';
      this.companyName = data.companyName ? data.companyName : '';
      this.email = data.email ? data.email : '';
      this.name = data.name ? data.name : '';
      this.city = data.city ? data.city : '';
      this.streetNumber = data.streetNumber ? data.streetNumber : '';
      this.zipCode = data.zipCode ? data.zipCode : '';
    });
  }

  // getCompanyData() {
  //   this.companiesCol = this.db.collection('companies', ref => ref.where('name', '==', this.companyName));
  //   this.companies = this.companiesCol.valueChanges();
  //   this.companies.subscribe(data => {
  //     console.log(data);
  //     this.companyBranche = data[0].branche;
  //   });
  // }

  updateUser = (name: string, city: string, streetNumber: string, zipCode: string) => {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.userUid}`);

    const UserUpdate: User = {
      name: name,
      city: city,
      streetNumber: streetNumber,
      zipCode: zipCode,
    };
    userRef.set(UserUpdate, { merge: true });
    this.userMessage = 'gegevens geupdate';
  }

  resetPassword() {
    console.log(this.controlleEmail);
    if (this.controlleEmail === undefined) {
      return this.controlleEmail = 'Geen geldige email ingevuld';
    }
    this.auth.resetPassword(this.email)
      .then(() => this.passReset = this.email === this.controlleEmail ? true : false);
    this.passMessage = 'Er is een bericht verzonden naar je Email';
  }


  //////////////////////// MAKE THE FUNCTIONS ONE BY ONE /////////////////////////
  ///////////// FIRST USER READ AND UPDATE ///////////////////////////////////////
  //// THEN COMPANY //////////////////////////////////////////////////////////////
  ///////////////////////////////// PASSWORD /////////////////////////////////////

}


