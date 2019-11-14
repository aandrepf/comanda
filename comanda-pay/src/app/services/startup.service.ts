import { Config } from './../models/config.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../shared/global';
import { IpcCom, Return, RetOperational } from '../models/general.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private API: string;
  private APP_URL: string;
  private MEA_URL: string;
  private TOTEM_URL: string;
  retorno: Config;

  constructor(private http: HttpClient) {
    this.getUrlsConfig();
  }

  getUrlsConfig() {
    return this.http.get(Global.CONFIG).pipe(
      tap(console.log)
    ).subscribe(
      (data: Config) => {
        Global.IPC = new IpcCom();
        Global.IPC.endpoint = data.endpoint;
        Global.IPC.protocol = data.protocol;

        this.API = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/api`;
        this.APP_URL = `${this.API}/app`;
        this.MEA_URL = `${this.API}/mea`;
        this.TOTEM_URL = `${this.API}/app/totem`;
      }
    );
  }

  getVersion() {
    return this.http.get<Return>(`${this.APP_URL}/version`);
  }

  getConnect() {
    return this.http.get<Return>(`${this.MEA_URL}/so/win/network/connect`);
  }

  getIsOperational() {
    return this.http.get<RetOperational>(`${this.TOTEM_URL}/operacional`);
  }

  getStatus() {
    return this.http.get(`${this.MEA_URL}/so/win/network/status`);
  }

  getAdminSitef() {
    const url = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/app/#/sitef-sale?type=110`;
    window.location.href = url;
  }

  getShutDown() {
    return this.http.get<Return>(`${this.MEA_URL}/so/win/shutdown`);
  }

  getRestart() {
    return this.http.get<Return>(`${this.MEA_URL}/so/win/restart`);
  }
}
