import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  message: string;
  email: string;

  constructor(private auth: AuthService,
    private db: AngularFirestore,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      console.log(user);
      this.email = user.email;
    });
  }

  accept = () => {

    if (!this.message) {
      this.snackBar.open('ERROR!! Er is geen bericht ingevuld', '', {
        duration: 2000,
      });
    } else {
    const id = this.db.createId();

    this.db.doc(`message/${id}`).set({
      'uid': id,
      'email': this.email,
      'message': this.message,
    });

    this.snackBar.open('bericht verzonden', '', {
      duration: 2000,
    });
  }
  }

}


