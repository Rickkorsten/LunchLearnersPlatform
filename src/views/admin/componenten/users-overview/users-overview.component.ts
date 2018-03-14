import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../app/core/auth.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  constructor( public dialog: MatDialog, public auth: AuthService) {
  }


  ngOnInit() {
  }

}
