import { AppService } from './../../services/app.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SurveyComponent } from './survey.component';
import { SurveyHomeComponent } from './survey-home/survey-home.component';
import { SurveyQuestionComponent } from './survey-question/survey-question.component';
import { SurveyAnswersComponent } from './survey-answers/survey-answers.component';
import { SurveyBondComponent } from './survey-bond/survey-bond.component';
import { SurveyService } from 'src/app/services/survey.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SurveyThanksComponent } from './survey-thanks/survey-thanks.component';
import { SurveyRouting } from './survey.routing';

import { MAT_KEYBOARD_LAYOUTS, MatKeyboardModule } from '@ngx-material-keyboard/core';
import { Global } from 'src/app/shared/global';

import { TextMaskModule } from 'angular2-text-mask';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { UserIdleModule } from 'angular-user-idle';
import { SurveyErrorComponent } from './survey-error/survey-error.component';
import { SurveyIdleComponent } from './survey-idle/survey-idle.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SurveyInitComponent } from './survey-init/survey-init.component';

@NgModule({
    imports: [
        CommonModule,
        NgxSpinnerModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SurveyRouting,
        MatKeyboardModule,
        TextMaskModule,
        DirectivesModule,
        PipesModule
    ],
    exports: [
        SurveyComponent
    ],
    declarations: [
        SurveyHomeComponent,
        SurveyQuestionComponent,
        SurveyAnswersComponent,
        SurveyBondComponent,
        SurveyThanksComponent,
        SurveyComponent,
        SurveyErrorComponent,
        SurveyIdleComponent,
        SurveyInitComponent
    ],
    providers: [
        SurveyService,
        AppService,
        { provide: MAT_KEYBOARD_LAYOUTS, useValue: Global.KeyboardCustomLayouts },
    ],
    bootstrap: [SurveyComponent]
})
export class SurveyModule { }
