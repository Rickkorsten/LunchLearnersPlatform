import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent{

  constructor(public auth: AuthService) { }

}
