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
  MatAutocompleteModule
} from '@angular/material';

@NgModule({
  exports: [
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
    MatAutocompleteModule],
})
export class MaterialModule { }
