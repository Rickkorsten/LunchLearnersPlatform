import { Component, OnInit } from '@angular/core';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';

@Component({
  selector: 'app-export-overview',
  templateUrl: './export-overview.component.html',
  styleUrls: ['./export-overview.component.scss'],
  providers: [FirebaseCallsService]
})
export class ExportOverviewComponent implements OnInit {

  ngOnInit() {}

}


