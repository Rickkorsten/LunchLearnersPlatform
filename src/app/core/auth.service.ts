import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  companyName?: string;
}

export class EmailPasswordCredentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  loggedIn: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

      this.user = this.afAuth.authState
        .switchMap(user => {
          if (user){
            this.loggedIn = true;
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            this.loggedIn = false;
            return Observable.of(null)
          }
        })

        this.afAuth.authState.subscribe((user: firebase.User) => {

          if(user){
            this.router.navigateByUrl('');
          } else{
            this.router.navigateByUrl('/login');
          }

        })

   }


   emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user); // if using firestore
      })
      .catch((error) => this.handleError(error) );
  }
   
   googleLogin() {
     const provider = new firebase.auth.GoogleAuthProvider
     return this.oAuthLogin(provider);
   }

   private oAuthLogin(provider) {
     return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
   }

   // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .catch((error) => this.handleError(error));
  }

   private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const User: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(User, { merge: true })

  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
  }

}
