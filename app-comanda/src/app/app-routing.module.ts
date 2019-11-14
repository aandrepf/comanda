import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'barcode' },
  { path: 'barcode', loadChildren: './barcode/barcode.module#BarcodeModule'},
  { path: 'lista', loadChildren: './comanda-lista/comanda-lista.module#ComandaListaModule'},
  { path: 'cpfnota', loadChildren: './cpf-nota/cpf-nota.module#CpfNotaModule'},
  { path: 'card', loadChildren: './card/card.module#CardModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
