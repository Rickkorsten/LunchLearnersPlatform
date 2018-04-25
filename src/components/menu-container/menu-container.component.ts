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
    console.log(this.selectedType);
  }

  constructor() {
    // this.type = 1;

    this.menuItems = [
      {
        'title': 'Boeken overzicht',
        'router': [{ outlets: { admin: 'books' } }],
        'icon': 'book',
        'id': 1,
      },
      {
        'title': 'Bedrijven overzicht',
        'router': [{ outlets: { admin: 'companies' } }],
        'icon': 'work',
        'id': 2,
      },
      {
        'title': 'Gebruikers overzicht',
        'router': [{ outlets: { admin: 'users' } }],
        'icon': 'supervisor_account',
        'id': 3,
      },
      {
        'title': 'Personeels overzicht',
        'router': [{ outlets: { admin: 'employees' } }],
        'icon': 'face',
        'id': 4,
      },
      {
        'title': 'Reviews overzicht',
        'router': [{ outlets: { admin: 'reviews' } }],
        'icon': 'star',
        'id': 5,
      },
      {
        'title': 'Database exporteren',
        'router': [{ outlets: { admin: 'export' } }],
        'icon': 'import_export',
        'id': 6,
      },
      {
        'title': 'Review builder',
        'router': [{ outlets: { admin: 'reviewbuilder' } }],
        'icon': 'rate_review',
        'id': 7,
      },
    ];

  }

  ngOnInit() {
  }






}
