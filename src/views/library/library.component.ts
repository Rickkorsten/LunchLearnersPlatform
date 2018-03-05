import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent{

  constructor(public auth: AuthService) { }

}
