import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  checkIfObjectIsEqual = (oldUser, newUser) => {
    if (JSON.stringify(oldUser) === JSON.stringify(newUser)) {
      return true;
    } else {
      return false;
    }
  }

}


