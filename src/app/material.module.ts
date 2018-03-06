import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule, MatSidenavModule, MatInputModule, MatDialogModule, MatExpansionModule } from '@angular/material';

@NgModule({
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule, MatSidenavModule, MatInputModule, MatDialogModule, MatExpansionModule ],
})
export class MaterialModule { }
