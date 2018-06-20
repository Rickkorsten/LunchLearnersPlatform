import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss']
})
export class ReviewDialogComponent implements OnInit {

  remark: string;
  title: string;
  generalRating: number;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
      this.remark = '';
      this.title = '';
      this.generalRating = 0;
  }

  ngOnInit() {
  }

  accept(): void {
    const smallReview = {'title': this.title, 'remark': this.remark, 'generalRating' : this.generalRating};
     this.dialogRef.close(smallReview);
  }
}
