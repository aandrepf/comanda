import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ConnectionComponent } from './connection.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  declarations: [
    ConnectionComponent
  ],
  exports: [
    ConnectionComponent
  ]
})
export class ConnectionModule { }
