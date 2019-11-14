import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { UserIdleModule } from 'angular-user-idle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarcodeModule } from './barcode/barcode.module';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComandaListaModule } from './comanda-lista/comanda-lista.module';
import { CpfNotaModule } from './cpf-nota/cpf-nota.module';
import { CardModule } from './card/card.module';
import { EndupModule } from './endup/endup.module';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule,
    BarcodeModule,
    SharedModule,
    ModalModule.forRoot(),
    ComandaListaModule,
    CpfNotaModule,
    AngularValidateBrLibModule,
    // idle: 10 segundos, timeout: 15 segundos, ping: 120 segundos
    UserIdleModule.forRoot({idle: 15, timeout: 15, ping: 120}),
    CardModule,
    EndupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
