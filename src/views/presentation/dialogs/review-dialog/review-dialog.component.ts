import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

  rating1: number;
  rating2: number;
  rating3: number;
  rating4: number;
  rating5: number;
  rating6: number;
  rating7: number;
  rating8: number;
  rating9: number;

  error: string;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
  }

  ngOnInit() {
  }

  accept(): void {

    if (!this.rating1 || !this.rating2 || !this.rating3 || !this.rating4 ||
      !this.rating5 || !this.rating6 || !this.rating7 || !this.rating8 || !this.rating9) {
        this.error = 'Er zijn velden niet ingevuld';
        return;
    }
    const result = {
      'q1': this.rating1,
      'q2': this.rating1,
      'q3': this.rating1,
      'q4': this.rating1,
      'q5': this.rating1,
      'q6': this.rating1,
      'q7': this.rating1,
      'q8': this.rating1,
      'q9': this.rating1,
    };
    this.dialogRef.close(result);
  }


}
