import { Config } from './../models/config.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../shared/global';
import { IpcCom, Return, RetOperational } from '../models/general.model';
import { tap } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';

class IpcComInit {
  endpoint: string;
  ssl: boolean;
  debug: string;
  port: string;
}

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private API: string;
  private APP_URL: string;
  private MEA_URL: string;
  private TOTEM_URL: string;
  public retorno: Config;
  public retornoInit: IpcComInit = new IpcComInit();

  constructor(private http: HttpClient, private _electron: ElectronService) {
    console.log('rodando electron?', this._electron.isElectronApp);
    if (this._electron.isElectronApp) {
      // this.retornoInit = this._electron.ipcRenderer.sendSync('com', {'evt': 'startup'});
      console.log('retorno electron', this.retornoInit);
    }
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

  unlockComanda(lockInfo) {
    const body = JSON.stringify(lockInfo);
    return this.http.get(`${this.API}/ConnectorPdv/comanda/unlock/${lockInfo.lock}/${lockInfo.comanda}`);
    // return this.http.post('http://localhost:8080/comanda/unlock', body);
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
