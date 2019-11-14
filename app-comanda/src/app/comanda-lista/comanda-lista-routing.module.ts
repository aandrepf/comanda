import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComandaListaComponent } from './comanda-lista/comanda-lista.component';

const routes: Routes = [
  { path: '', component: ComandaListaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComandaListaRoutingModule { }
