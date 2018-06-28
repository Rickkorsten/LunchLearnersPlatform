import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {

  admin: boolean;
  user: string;

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user.subscribe(u => {
      if (u.role !== 'employee') {
        this.router.navigate(['']);
      }
    });
  }

  checkIfObjectIsEqual = (oldUser, newUser) => {
    if (JSON.stringify(oldUser) === JSON.stringify(newUser)) {
      return true;
    } else {
      return false;
    }
  }

}


