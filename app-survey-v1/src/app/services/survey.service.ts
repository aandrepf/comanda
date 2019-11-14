import { ISurveyResult } from './../models/survey.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from './global.service';
import { Global } from '../shared/global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class SurveyService {

  private _url: string;

  constructor(private _global: GlobalService, private _http: HttpClient) { }

  postSurvey(result: ISurveyResult) {
    this._url = this._global.appConfig.urlServer + Global.POST_SURVEY;
    return this._http.post(this._url, result, httpOptions);
  }

  getSurvey() {
    if (Global.IS_TEST_MODE) {
      this._url = './../../assets/data/survey.json';
    } else {
      this._url = this._global.appConfig.urlServer + Global.GET_SURVEY;
    }
    return this._http.get(this._url);
  }

}
