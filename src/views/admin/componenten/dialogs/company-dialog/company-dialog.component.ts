import {Component, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company-dialog.component.html',
  styleUrls: ['./company-dialog.component.scss']
})
export class CompanyDialogComponent {

  allBranches: string[];

  constructor(

    public dialogRef: MatDialogRef<CompanyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.allBranches = [
        'Bouw en Vastgoed',
        'Communicatie en Media',
        'Consultancy',
        'Energiebedrijven',
        'Facilitaire dienstverlening',
        'Fast Moving Consumer Goods',
        'Financiële dienstverlening',
        'Financiële instellingen',
        'Gezondheidszorg en welzijnszorg',
        'Handel en retail',
        'Horeca, Recreatie, Toerisme en Cultuur',
        'Industrie',
        'Informatie en Communicatie Technologie (ICT)',
        'Intermediairs',
        'Juridische dienstverlening',
        'Land- en tuinbouw',
        'Onderwijs en Onderzoek',
        'Overheid en semi-overheid',
        'Technische dienstverlening',
        'Telecommunicatie',
        'Transport en Logistiek'
      ];
    }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
