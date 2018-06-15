import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

// This Auth Service handels everything related to user accounts and authentication
// The Auth Guard makes sure people can't access pages if the are not logged in

// This user interface describes everthing we want from the user object in Firebase
interface User {
  uid: string;
  email: string;
  role: string;
  companyUid: string;
  companyName: string;
  name?: string;
  city?: string;
  streetNumber?: string;
  zipCode?: string;
}

@Injectable()
export class AuthService {

  user: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {

    // Check if user is loged in, if user is loged in than get all the user data and insert it into the User interface
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });

  }

  // Create new user and put new user in database
  emailSignUp(email: string, password: string, companyUID: string, usersArray, companyName: string, companySuffix: string) {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigateByUrl('');
        return this.updateUserData(user, companyUID, usersArray, companyName, companySuffix); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }

  // Login function and when logged in calls updateUserData()
  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigateByUrl('').then(result => {
          console.log(result);
          window.location.reload();
        });
        return this.updateUserData(user, '', '', '', ''); // if using firestore
      })
      .catch((error) => this.handleError(error));
  }


  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .catch((error) => this.handleError(error));
  }

  private updateUserData(user, companyUID, usersArray, companyName, companySuffix) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    // takes old array and added new array to it (combines)
    const newUserArray = usersArray.concat(user.uid);

    // get role of the user (admin/employee/user)
    const role = companySuffix === 'lunchlearners.nl' ? 'employee' : 'user';

    const UserUpdate: User = {
      uid: user.uid,
      email: user.email,
      companyUid: companyUID,
      role: role,
      companyName: companyName
    };

    this.addUserUidToCompany(companyUID, newUserArray);

    return userRef.set(UserUpdate, { merge: true });

  }

  addUserUidToCompany(companyUID, users) {
    this.afs.doc(`companies/${companyUID}`).update({
      'users': users
    }, );
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']).then(result => {
        console.log(result);
        window.location.reload();
      });
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
  }

}
