import { Component, OnInit } from '@angular/core';
import { IError } from 'src/app/models/survey.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-survey-error',
    templateUrl: './survey-error.component.html',
    styleUrls: ['./survey-error.component.css']
})
export class SurveyErrorComponent implements OnInit {

    public error: IError;

    constructor(private _router: Router, private _route: ActivatedRoute) { }

    ngOnInit() {


        this._route.params.subscribe(res => {
            const ret = JSON.parse(atob(res.message));
            this.error = {
                message: ret.message,
                txtColor: ret.txtColor,
                bgColor: ret.bgColor
            };
        });

        setTimeout(() => {
          // this._router.navigate(['/survey-home']);
          const url = 'http://localhost:5000/init/';
          window.location.href = url;
        }, 5 * 1000);

    }

}
