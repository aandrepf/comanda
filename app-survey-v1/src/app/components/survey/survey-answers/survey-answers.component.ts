import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IAnswer, IAnswerResult, IQuestionResult } from 'src/app/models/survey.model';

import { IConfirm } from './../../../models/survey.model';

@Component({
    selector: 'app-survey-answers',
    templateUrl: './survey-answers.component.html',
    styleUrls: ['./survey-answers.component.css']
})
export class SurveyAnswersComponent implements OnInit, OnChanges {

    @Input() questionId: number;

    @Input() isVertical: string;
    @Input() isMultiple: string;
    @Input() questAnswers: IAnswer[];
    @Input() confirm: IConfirm;
    @Input() questionsResult: IQuestionResult[];

    @Output() evt = new EventEmitter<IAnswerResult[]>();

    private _answerResult: IAnswerResult[] = [];
    private _memory: any[] = [];

    public answers: IAnswer[] = [];

    public isConfirmDisabled = true;

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {

        this._memory = [];
        this.answers = [];

        this.questAnswers.forEach(memoryElement => {
            this._memory.push({
                id: memoryElement.idAnswer,
                idOpt: memoryElement.idAnswerOption,
                color: memoryElement.txtColor,
                bgColor: memoryElement.bgColor,
                selColor: memoryElement.selectedTxtColor,
                selBgColor: memoryElement.selectedBgColor
            });
            this.answers.push({
                idAnswer: memoryElement.idAnswer,
                descrAnswer: memoryElement.descrAnswer,
                idAnswerOption: memoryElement.idAnswerOption,
                txtColor: memoryElement.txtColor,
                bgColor: memoryElement.bgColor,
                selectedBgColor: memoryElement.selectedBgColor,
                selectedTxtColor: memoryElement.selectedTxtColor,
                icon: memoryElement.icon
            });
        });

        this._answerResult = [];

        const isQr = this.questionsResult
            .find(x => x.idQuestion === this.questionId) === undefined ? false : true;

        if (isQr) {

            this.questionsResult.filter(x => x.idQuestion === this.questionId)
                .forEach(elementQr => {

                    this._answerResult.push({
                        idAnswer: elementQr.idAnswer,
                        idAnswerOption: elementQr.idAnswerOption
                    });

                    console.log('elementQr', elementQr);

                    console.log('answers', this.answers);

                    this.answers
                        .filter(x => x.idAnswer === elementQr.idAnswer && x.idAnswerOption === elementQr.idAnswerOption)
                        .forEach(elementA => {
                            elementA.txtColor = elementA.selectedTxtColor;
                            elementA.bgColor = elementA.selectedBgColor;
                            console.log('elementA', elementA);
                        });

                });

                setTimeout(() => this.isConfirmDisabled = false);

        } else {

            const notSelectedItem = this.answers
                .filter(x => x.txtColor !== x.selectedTxtColor && x.bgColor !== x.selectedBgColor)[0];

            this.answers.forEach(elementAnswers => {
                elementAnswers.txtColor = notSelectedItem.txtColor;
                elementAnswers.bgColor = notSelectedItem.bgColor;
            });

        }

    }

    getOpt(item: IAnswer) {

        const obj = this._answerResult
            .find(x => x.idAnswer === item.idAnswer && x.idAnswerOption === item.idAnswerOption);

        if (this.isMultiple) {

            if (obj === undefined) {
                // add item
                this._answerResult.push({
                    idAnswer: item.idAnswer,
                    idAnswerOption: item.idAnswerOption
                });
            } else {
                // remove item
                this._answerResult = this._answerResult
                    .filter(x => x.idAnswer !== obj.idAnswer && x.idAnswerOption !== obj.idAnswerOption);
            }

        } else {

            if (obj === undefined) {

                this._answerResult = this._answerResult
                    .filter(x => x.idAnswer === item.idAnswer && x.idAnswerOption === item.idAnswerOption);

                this._answerResult.push({
                    idAnswer: item.idAnswer,
                    idAnswerOption: item.idAnswerOption
                });

            }

        }

        if (!this.confirm.isConfirm) {
            this.doConfirm();
        } else {
            this.handleBtnState(item);
        }

        console.log('this._answerResult', this._answerResult);

        setTimeout(() => {
            this.isConfirmDisabled = this._answerResult.length === 0 ? true : false;
        });

    }

    handleBtnState(item: IAnswer) {

        if (this.isMultiple) {

            this.answers.forEach(elementBtn => {

                const ma = this._memory.filter(x =>
                    x.id === elementBtn.idAnswer && x.idOpt === elementBtn.idAnswerOption)[0];

                const isOnAr = this._answerResult
                    .find(x =>
                        x.idAnswer === elementBtn.idAnswer &&
                        x.idAnswerOption === elementBtn.idAnswerOption) === undefined ? false : true;

                if (!isOnAr) {

                    elementBtn.txtColor = ma.color;
                    elementBtn.bgColor = ma.bgColor;

                } else {

                    elementBtn.txtColor = ma.selColor;
                    elementBtn.bgColor = ma.selBgColor;

                }


            });

        } else {

            this.answers.forEach(elementBtn => {

                const ma = this._memory.filter(x =>
                    x.id === elementBtn.idAnswer && x.idOpt === elementBtn.idAnswerOption)[0];

                if (elementBtn.idAnswer === item.idAnswer && elementBtn.idAnswerOption === item.idAnswerOption) {

                    elementBtn.txtColor = ma.selColor;
                    elementBtn.bgColor = ma.selBgColor;

                } else {

                    elementBtn.txtColor = ma.color;
                    elementBtn.bgColor = ma.bgColor;

                }

            });

        }

    }

    doConfirm() {

        this.evt.emit(this._answerResult);
        this._answerResult = [];
        this.answers = [];
        this.isConfirmDisabled = true;

    }

}
