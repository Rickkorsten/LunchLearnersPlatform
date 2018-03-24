import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})

export class AdminComponent implements OnInit {

  name: string;
  code: string;
  branche: string;
  emailsuffix: string;
  users: string[] = [];
  books: string[] = [];
  message: string;

  constructor(
    public dialog: MatDialog,
  ) {

  }

  ngOnInit() { }

}


