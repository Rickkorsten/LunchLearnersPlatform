import { NgModule } from '@angular/core';

import {
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
  MatMenuModule
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
    MatSelectModule
  ],
})
export class MaterialModule { }
