import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { BarcodeRoutingModule } from './barcode-routing.module';
import { BarcodeBaseComponent } from './barcode-base/barcode-base.component';
import { BarcodeErrorComponent } from './barcode-error/barcode-error.component';
import { BarcodePerrorComponent } from './barcode-perror/barcode-perror.component';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    BarcodeRoutingModule
  ],
  declarations: [BarcodeBaseComponent, BarcodeErrorComponent, BarcodePerrorComponent]
})
export class BarcodeModule { }
