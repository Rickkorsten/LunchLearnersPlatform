import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatExpansionModule,
  MatListModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatMenuModule,
  MatRadioModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule
  ],
})
export class MaterialModule { }
