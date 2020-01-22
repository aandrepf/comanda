import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IThanks } from 'src/app/models/survey.model';

@Component({
    selector: 'app-survey-thanks',
    templateUrl: './survey-thanks.component.html',
    styleUrls: ['./survey-thanks.component.css']
})
export class SurveyThanksComponent implements OnInit {

    public thanks: IThanks;

    constructor(private _router: Router, private _route: ActivatedRoute) { }

    ngOnInit() {

        this._route.params.subscribe(res => {
            const ret = JSON.parse(atob(res.message));
            this.thanks = {
                message: ret.message,
                txtColor: ret.txtColor,
                bgColor: ret.bgColor,
                bond: ret.bond,
                isBgData64: ret.isBgData64
            };
        });

        if (this.thanks.bond !== undefined) {

            this.thanks.message = this.thanks.message.replace('#CLIENTNAME#', this.thanks.bond.name);

        }

        setTimeout(() => {
          // this._router.navigate(['/survey-home']);
          const url = 'http://localhost:5000/init/';
          window.location.href = url;
        }, 5 * 1000);

    }

}
