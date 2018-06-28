import { Component, OnInit } from '@angular/core';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-message-overview',
  templateUrl: './message-overview.component.html',
  styleUrls: ['./message-overview.component.scss']
})
export class MessageOverviewComponent implements OnInit {

  messages: any;

  constructor(private FirebaseCall: FirebaseCallsService,
    private db: AngularFirestore) { }

  ngOnInit() {
    this.FirebaseCall.getMessages()
    .subscribe(message => this.messages = message);
  }

  deleteMessage(uid) {
    this.db.doc(`message/${uid}`).delete();
  }
}
