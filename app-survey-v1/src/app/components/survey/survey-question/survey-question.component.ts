import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IQuestion, IQuestionResult, IAnswerResult } from 'src/app/models/survey.model';

@Component({
    selector: 'app-survey-question',
    templateUrl: './survey-question.component.html',
    styleUrls: ['./survey-question.component.css']
})
export class SurveyQuestionComponent implements OnInit, OnChanges {

    /**
     * armazena temporariamente os resultados em caso de acesso a tela de bonds.
     */
    @Input() bondTempQr: IQuestionResult[];

    @Input() question: IQuestion;
    @Output() evt = new EventEmitter<IQuestionResult[]>();

    public results: IQuestionResult[] = [];

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {

        if (this.bondTempQr.length > 0) {
            this.results = this.bondTempQr;
        }

    }

    selectAnswer(answersResult: IAnswerResult[]) {

        // remove questionResult if exist
        this.results = this.results.filter(x => x.idQuestion !== this.question.idQuestion);

        answersResult.forEach(element => {

            this.results.push({
                idQuestion: this.question.idQuestion,
                idAnswer: element.idAnswer,
                idAnswerOption: element.idAnswerOption
            });

        });

        this.evt.emit(this.results);

    }

}
