import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.scss']
})
export class MenuContainerComponent implements OnInit {

  selectedType: number;
  menuItems: object;

  setActive(type: number) {
    this.selectedType = type;
  }

  constructor() {

    this.menuItems = [
      {
        'title': 'Boeken overzicht',
        'router': ['books'],
        'icon': 'book',
        'id': 1,
      },
      {
        'title': 'Bedrijven overzicht',
        'router': ['companies'],
        'icon': 'work',
        'id': 2,
      },
      {
        'title': 'Gebruikers overzicht',
        'router': ['users'],
        'icon': 'supervisor_account',
        'id': 3,
      },
      {
        'title': 'Personeels overzicht',
        'router': ['employees'],
        'icon': 'face',
        'id': 4,
      },
      {
        'title': 'Database exporteren',
        'router': ['export'],
        'icon': 'import_export',
        'id': 5,
      },
      {
        'title': 'Review builder',
        'router': ['reviewbuilder'],
        'icon': 'rate_review',
        'id': 6,
      },
      {
        'title': 'Berichten',
        'router': ['messages'],
        'icon': 'message',
        'id': 7,
      },
    ];

  }

  ngOnInit() {
  }






}
