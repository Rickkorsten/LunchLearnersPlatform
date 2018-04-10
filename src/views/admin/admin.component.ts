import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const user1 = {
      name: 'rick',
      age: '25'
    };
    const user2 = {
      name: 'rick',
      age: '22'
    };
    localStorage.setItem('user', JSON.stringify(user1));
    console.log(user2);
    console.log(this.checkIfObjectIsEqual(user1, user2));
  }

  checkIfObjectIsEqual = (oldUser, newUser) => {
    if (JSON.stringify(oldUser) === JSON.stringify(newUser)) {
      return true;
    } else {
      return false;
    }
  }

}


