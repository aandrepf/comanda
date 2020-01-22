import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularValidateBrLibModule } from 'angular-validate-br';
import { UserIdleModule } from 'angular-user-idle';

// componente pai da aplicação
import { AppComponent } from './app.component';

// arquivo de rotas da aplicação
import { routing } from './app.routing';

// módulos da aplicação
import { StartupModule } from './component/startup/startup.module';
import { ConnectionModule } from './component/connection/connection.module';
import { OperationalModule } from './component/operational/operational.module';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxElectronModule,
    routing,
    // idle: 10 segundos, timeout: 15 segundos, ping: 120 segundos
    UserIdleModule.forRoot({idle: 15, timeout: 15, ping: 120}),
    AngularValidateBrLibModule,
    StartupModule,
    ConnectionModule,
    OperationalModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
