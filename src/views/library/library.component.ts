import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  providers: [FirebaseCallsService]
})
export class LibraryComponent implements OnInit {

  books: any;

  constructor(
    public auth: AuthService,
    private FirebaseCall: FirebaseCallsService
  ) { }

  ngOnInit() {
    this.books = this.FirebaseCall.getBooksCollection();
    console.log(this.books);
  }


}
