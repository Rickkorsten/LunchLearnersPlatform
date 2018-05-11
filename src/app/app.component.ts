import { Component, } from '@angular/core';
import { AuthService } from './core/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userRole: string;

  constructor(
    public auth: AuthService,

  ) {
    // this.FirebaseCall.getUserByIUD
    console.log('user : ' + this.auth.user.subscribe(user => this.userRole = user.role));

  }
}

