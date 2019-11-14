import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ComandaInfo } from '../models/comanda';
import { Observable } from 'rxjs';
import { Return } from '../startup/startup';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private readonly API = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/api`;
  private readonly MEA_URL = `${this.API}/mea`;
  constructor(private http: HttpClient) {
  }

  getcomanda(codigo: string): Observable<ComandaInfo> {
    return this.http.get<ComandaInfo>(`${this.API}/Comanda/${codigo}`);
  }

  getPrinterStatus() {
    return this.http.get<Return>(`${this.MEA_URL}/device/printer/status`);
  }
}
