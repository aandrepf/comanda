import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { SurveyModule } from './components/survey/survey.module';
// import { MidiaModule } from './components/midia/midia.module';
import { GlobalService } from './services/global.service';
import { DirectivesModule } from './shared/directives/directives.module';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
      BrowserModule,
      SurveyModule,
      HttpClientModule,
      // tslint:disable-next-line: deprecation
      HttpModule,
      DirectivesModule,
      BrowserAnimationsModule,
      UserIdleModule.forRoot({ idle: 30, timeout: 2, ping: 120 })
    ],
    providers: [
      GlobalService,
      // { provide: APP_BASE_HREF, useValue: './' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
