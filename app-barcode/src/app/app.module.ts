import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { UserIdleModule } from 'angular-user-idle';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RoutingState } from './routingState.service';

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
    SharedModule,
    ModalModule.forRoot(),
    AngularValidateBrLibModule,
    // idle: 10 segundos, timeout: 15 segundos, ping: 120 segundos
    UserIdleModule.forRoot({idle: 15, timeout: 15, ping: 120}),
    NgxInfiniteScrollerModule
  ],
  providers: [
    RoutingState
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
