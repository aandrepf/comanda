import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComandaListaRoutingModule } from './comanda-lista-routing.module';
import { ComandaListaComponent } from './comanda-lista/comanda-lista.component';

@NgModule({
  imports: [
    CommonModule,
    ComandaListaRoutingModule
  ],
  declarations: [ComandaListaComponent]
})
export class ComandaListaModule { }
