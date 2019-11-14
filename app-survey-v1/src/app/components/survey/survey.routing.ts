import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurveyHomeComponent } from './survey-home/survey-home.component';
import { SurveyThanksComponent } from './survey-thanks/survey-thanks.component';
import { SurveyErrorComponent } from './survey-error/survey-error.component';
import { SurveyIdleComponent } from './survey-idle/survey-idle.component';
import { SurveyInitComponent } from './survey-init/survey-init.component';

const appRoutes: Routes = [
  { path: 'survey-init', component: SurveyInitComponent },
  { path: 'survey-home', component: SurveyHomeComponent },
  { path: 'survey-idle', component: SurveyIdleComponent },
  { path: 'survey-thanks/:message', component: SurveyThanksComponent },
  { path: 'survey-error/:message', component: SurveyErrorComponent },
  { path: '', component: SurveyInitComponent }
];
export const SurveyRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
