import { Component, OnInit, Input } from '@angular/core';
import { FirebaseCallsService } from './../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-settings-card2',
  templateUrl: './settings-card2.component.html',
  styleUrls: ['./settings-card2.component.scss']
})
export class SettingsCard2Component implements OnInit {

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
