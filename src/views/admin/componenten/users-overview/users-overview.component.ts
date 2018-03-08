import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PostBookComponent } from './../../../../components/post-book/post-book.component';
import { CompanyDialogComponent } from './../../../../components/company-dialog/company-dialog.component';
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

  openDialog(): void {
    let dialogRef = this.dialog.open(CompanyDialogComponent, {
      width: '300px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  ngOnInit() {
  }

}
