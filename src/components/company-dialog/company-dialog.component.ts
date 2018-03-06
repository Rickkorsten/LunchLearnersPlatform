import {Component, Inject, } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.css']
})
export class CompanyDialogComponent {

  constructor(

    public dialogRef: MatDialogRef<CompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
