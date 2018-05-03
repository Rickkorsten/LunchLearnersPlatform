import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-book-info-header',
  templateUrl: './book-info-header.component.html',
  styleUrls: ['./book-info-header.component.scss']
})
export class BookInfoHeaderComponent implements OnInit {

  @Input() book: any;
  @Input() type: string; // can be 'large' or 'small'

  presentor: string;

  constructor(private FirebaseCall: FirebaseCallsService) { }

  ngOnInit() {
    this.FirebaseCall.getUserByIUD(this.book.employee)
    .subscribe(user => this.presentor = user[0].name ? user[0].name : user[0].companyName );
  }

  checkDbOutput = (data: string) => {
    if (data === undefined) {
      return 'no data';
    } else {
      return data;
    }
  }

}
