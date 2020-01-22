import { BarcodeService } from './../../barcode/barcode.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';
import { RoutingState } from 'src/app/routingState.service';
import { LockInfo } from 'src/app/models/comanda';
import { interval, throwError, of } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';

@Component({
  selector: 'app-cpf-base',
  templateUrl: './cpf-base.component.html',
  styleUrls: ['./cpf-base.component.css', './btn-style.scss']
})
export class CpfBaseComponent implements OnInit {
  payBtnText = 'não';
  showLoading;
  msg;

  constructor(private router: Router, private route: ActivatedRoute, private routingState: RoutingState,
    private barcodeService: BarcodeService) {
    console.log('flow ==> cpf base', Global.FLOW);
    if (!Global.FLOW) { this.router.navigate(['/barcode']); }
  }

  ngOnInit() {
    this.routingState.getHistory();
  }

  includeCPF() {
    console.log('escolheu incluir CPF!');
    this.router.navigate(['incluir'], { relativeTo: this.route });
  }

  notIncludeCPF() {
    console.log('não escolheu incluir CPF!');
    // tslint:disable-next-line: max-line-length
    const url = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/app/#/sitef-sale?type=${Global.FLOW.tipoServico}&val=${Global.FLOW.valor}&doc=''&card=${Global.FLOW.tipoCartao}`;
    window.location.href = url;
  }

  payComanda() {
    this.payBtnText = 'processando!';
    this.showLoading = true;
    this.barcodeService.getLockComanda().subscribe({
      next: (valor: LockInfo) => {
        const lockInfo: any = {};
        lockInfo.comanda = Global.FLOW.codigo;
        lockInfo.lock = valor.ret.str;
        localStorage.setItem('lockInfo', JSON.stringify(lockInfo));

        if (valor.ret.sts === 0) {
          setTimeout(() => {
            // this.router.navigate(['/card']);
            this.notIncludeCPF();
          }, 200);
        }
      },
      error: valor => {
        const source = interval(1000);
        const example = source.pipe(
          mergeMap(val => {
            if (val > 3) {
              return throwError('Error!');
            }
            return of(valor);
          }),
          retry(1)
        );

        example.subscribe({
          next: val => void(0),
          error: val => {
            console.log(`${val}: tentou mais duas vezes e parou!`);
            this.comandaIndisponivel();
           }
        });
      }
    });
  }

  comandaIndisponivel() {
    console.log('comanda travada!');
    this.router.navigate(['locked'], { relativeTo: this.route });
  }

  goBack() {
    this.router.navigate(['/lista']);
  }
}
