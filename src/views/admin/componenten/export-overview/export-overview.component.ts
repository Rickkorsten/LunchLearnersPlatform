import { Component, OnInit } from '@angular/core';
import { FirebaseCallsService } from './../../../../app/services/firebaseCalls/firebase-calls.service';
import {CsvService} from './../../../../app/services/csv.service';

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
  }

  async download(reviewcoll) {
    await this.getreviews(reviewcoll);
    this._csvService.download(this.reviews, reviewcoll);
  }

  getreviews(reviewcoll) {
    return new Promise(resolve => {
    this.FirebaseCall.getReviews(reviewcoll).subscribe(review => resolve(this.reviews = review));
    });
  }

}


