import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  user: any;

  constructor(private db: AngularFirestore, public dialog: MatDialog, private storage: AngularFireStorage, public auth: AuthService) {
    this.user == auth.user;
    console.log(this.user);
  }


  ngOnInit() {
  }

}
