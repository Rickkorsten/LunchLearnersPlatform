import { Component, } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  admin: boolean;
  user: boolean;

  constructor(
    public auth: AuthService,
  ) {
    this.admin = true;
    this.user = false;
    if (auth.user) {
      this.user = true;
    } else {
      this.user = false;
    }
  }
}

