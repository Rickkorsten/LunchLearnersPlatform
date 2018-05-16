import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';
// import { FirebaseCallsService } from '../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  admin: boolean;
  user: string;

  constructor(
    public auth: AuthService,
    // private FirebaseCall: FirebaseCallsService,
  ) {
    // this.FirebaseCall.getUserByIUD();

  }

  ngOnInit() {
    this.auth.user.subscribe(u => {
      this.user = u.role;
      console.log(u);
    });
  }
}

