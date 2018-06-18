import { Component, OnInit } from '@angular/core';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';
import {CsvService} from 'angular2-json2csv';

@Component({
  selector: 'app-export-overview',
  templateUrl: './export-overview.component.html',
  styleUrls: ['./export-overview.component.scss'],
  providers: [FirebaseCallsService, CsvService]
})
export class ExportOverviewComponent implements OnInit {

  reviews: any;

  constructor(
    private _csvService: CsvService,
    private FirebaseCall: FirebaseCallsService
  ) {}

  ngOnInit() {
    this.FirebaseCall.getReviews().subscribe(review => this.reviews = review);
  }

  download() {
    this._csvService.download(this.reviews, 'Filename');
  }

}


