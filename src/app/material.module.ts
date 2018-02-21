import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatGridListModule, MatCardModule ],
})
export class MaterialModule { }