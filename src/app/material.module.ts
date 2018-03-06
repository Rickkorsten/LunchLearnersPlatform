import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule, MatSidenavModule, MatInputModule } from '@angular/material';

@NgModule({
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule, MatSidenavModule, MatInputModule ],
})
export class MaterialModule { }
