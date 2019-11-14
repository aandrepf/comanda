import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { OperationalComponent } from './operational.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    OperationalComponent
  ],
  exports: [
    OperationalComponent
  ]
})
export class OperationalModule { }
