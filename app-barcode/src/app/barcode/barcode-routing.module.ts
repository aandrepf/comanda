import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarcodeBaseComponent } from './barcode-base/barcode-base.component';
import { BarcodeErrorComponent } from './barcode-error/barcode-error.component';
import { BarcodePerrorComponent } from './barcode-perror/barcode-perror.component';

const routes: Routes = [
  { path: '', component: BarcodeBaseComponent},
  { path: 'error', component: BarcodeErrorComponent},
  { path: 'perror', component: BarcodePerrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarcodeRoutingModule {}
