import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-survey-idle',
    templateUrl: './survey-idle.component.html',
    styleUrls: ['./survey-idle.component.css']
})
export class SurveyIdleComponent implements OnInit {

    constructor(private _router: Router, private _route: ActivatedRoute) { }

    ngOnInit() {
      setTimeout(() => this._router.navigate(['/survey-home']), 2 * 1000);
    }

}
