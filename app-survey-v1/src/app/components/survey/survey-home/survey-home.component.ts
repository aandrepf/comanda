import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { SurveyService } from 'src/app/services/survey.service';
import { ISurvey, IBond, IQuestionResult, ISurveyResult, ISuveyBondIdResult, IThanks, IError } from '../../../models/survey.model';
import { Global } from 'src/app/shared/global';

@Component({
    selector: 'app-home-survey',
    templateUrl: './survey-home.component.html',
    styleUrls: ['./survey-home.component.css']
})
export class SurveyHomeComponent implements OnInit {

    public pageIndex = 0;
    public totalQuestion = 0;

    public loading = false;

    public isBgData64 = false;

    public survey: ISurvey;

    public isBondQuestion = false;

    public questionsResult: IQuestionResult[] = [];

    public bondTempQr: IQuestionResult[] = [];

    private _bondResult: IBond;
    private _surveyBondIdResult: ISuveyBondIdResult[] = [];
    private _surveyResult: ISurveyResult;
    private _thanks: IThanks;
    private _error: IError;

    constructor(
        private _loading: NgxSpinnerService,
        private _router: Router,
        private _service: SurveyService,
        public sanitizer: DomSanitizer) { }

    ngOnInit() {
        this._loading.show();
        setTimeout(() => {
            this.getSurvey();
        }, 1500);
    }

    getSurvey() {
        this._service.getSurvey().subscribe((data: any) => {
            if (data.ret != null) {
                this.survey = data.ret.survey;
                this.isBgData64 = this.survey.bgColor.startsWith('#') ? false : true;
                this.totalQuestion = this.survey.question.length;
                this._loading.hide();
                this.loading = true;
            } else {
                setTimeout(() => this.getSurvey(), 10 * 1000);
            }
        }, (error: HttpErrorResponse) => {
            if (error.status === 500) {
                console.log(error);
                this.handleError('pesquisa não encontrada ou serviço indisponível.');
            } else {
                setTimeout(() => this.getSurvey(), 10 * 1000);
            }
        });
    }

    saveQuestion(questionsResult: IQuestionResult[]) {

        this.questionsResult = questionsResult;

        if (this.questionsResult.length !== 0) {
            Global.IS_ANY_QUESTION_ANSWER = true;
        }

        this.next();

    }

    saveBond(result: IBond) {
        this._bondResult = result;
        this.submitResult();
    }

    submitResult() {

        Global.IS_ANY_QUESTION_ANSWER = false;

        this.questionsResult.forEach(element => {
            this._surveyBondIdResult.push({
                idSurvey: this.survey.idSurvey,
                idQuestion: element.idQuestion,
                idAnswer: element.idAnswer,
                idAnswerOption: element.idAnswerOption
            });
        });

        this._surveyResult = {
            bond: this._bondResult,
            resultIds: this._surveyBondIdResult
        };

        console.log(this._surveyResult);

        this._service.postSurvey(this._surveyResult).subscribe(() => {

            this._thanks = {
                message: this.survey.thanksMsg,
                txtColor: this.survey.txtColor,
                bgColor: this.survey.bgColor,
                bond: this._bondResult,
                isBgData64: this.isBgData64
            };

            this._router.navigate([`/survey-thanks/${btoa(JSON.stringify(this._thanks))}`]);

        }, (error) => this.handleError('não foi possível salvar a pesquisa feita.'));

    }

    next() {

        const isLastQuestion = this.pageIndex >= this.totalQuestion - 1;

        if (this.survey.useBond) {
            this.isBondQuestion = isLastQuestion;
            if (!this.isBondQuestion) {
                this.pageIndex++;
            } else {
                if (this.pageIndex === 0) {
                    this.pageIndex++;
                }
            }
        } else {
            if (isLastQuestion) {
                this.submitResult();
            } else {
                this.pageIndex++;
            }
        }

        this.bondTempQr = this.questionsResult;

    }

    back() {

        if (this.pageIndex > 0) {

            if (this.isBondQuestion) {
                this.isBondQuestion = false;
                this.pageIndex = this.totalQuestion - 1;
            } else {
                this.pageIndex--;
            }

        }

        this.bondTempQr = this.questionsResult;

    }

    handleError(error: string) {

        this._error = {
            message: `<i class="fas fa-info-circle fa-2x"></i>
                      <p>ops! ${ error}<br/> tentando novamente...</p>`,
            txtColor: '#FFFFFF',
            bgColor: '#424242'
        };

        this._router.navigate([`/survey-error/${btoa(JSON.stringify(this._error))}`]);

    }

}
