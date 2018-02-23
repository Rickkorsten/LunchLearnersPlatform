import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LibraryComponent } from './../components/library/library.component';
import { StoreComponent } from './../components/store/store.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { FormsModule } from '@angular/forms';

var firebaseConfig = {
  apiKey: "AIzaSyBR3HJduE1qTWlz7D7LiLlVDPda3Vu3wBk",
  authDomain: "lunchlearners.firebaseapp.com",
  databaseURL: "https://lunchlearners.firebaseio.com",
  projectId: "lunchlearners",
  storageBucket: "lunchlearners.appspot.com",
  messagingSenderId: "89316466478"
};

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    StoreComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    routes,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
