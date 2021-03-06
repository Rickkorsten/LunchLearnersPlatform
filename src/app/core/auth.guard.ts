import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

// AuthGuard makes sure that only users that are logged in can access all pages

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate( _1, _2 ): Observable<boolean> | boolean {
    // need to use the next and state in function
    // console.log(next, state);
    return this.auth.user
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          // If an user is not logged in we send them back to the login page
          this.router.navigate(['/login']).then(result => {
            console.log(result);
            window.location.reload();
          });
        }
      });

  }
}
