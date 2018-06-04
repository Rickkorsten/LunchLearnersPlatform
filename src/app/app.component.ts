import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  admin: boolean;
  user: string;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.user.subscribe(u => {
      this.user = u.role;
    });
  }
}

