import { ComandaInfo } from './../../models/comanda';
import { Comanda } from 'src/app/models/comanda';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/global';
import { interval, Subscription, throwError, of } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';
import { BarcodeService } from '../barcode.service';
import { Flow } from 'src/app/models/flow';

@Component({
  selector: 'app-barcode-base',
  templateUrl: './barcode-base.component.html',
  styleUrls: ['./barcode-base.component.css']
})
export class BarcodeBaseComponent implements OnInit, OnDestroy, AfterViewInit {
  private subStatusTimer = new Subscription();
  private sub = new Subscription();
  printerOK = true;
  hide = true;
  showLoading = false;
  waitMessage = 'verificando sua comanda';

  @ViewChild('barcode') barcode: ElementRef;

  constructor(private barcodeService: BarcodeService, private router: Router, private route: ActivatedRoute) {
    document.querySelector('body').classList.remove('system-ok', 'system-error', 'system-alert');
    document.querySelector('body').classList.add('barcode-back');

    Global.FLOW = new Flow(0, '', null, '', 0, '');
    console.log('flow ==> barcode', Global.FLOW);

    const con = JSON.parse(localStorage.getItem('conections'));
    if (con) {
      if (!Global.FLOW) {
        this.router.navigate(['/barcode']);
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.getPrinter();
  }

  ngAfterViewInit() {
    this.focus();
  }

  ngOnDestroy() {
    this.subStatusTimer.unsubscribe();
    this.sub.unsubscribe();
  }

  focus(): void {
    this.barcode.nativeElement.value = '';
    console.log('recebeu focus', this.barcode.nativeElement.value);
    this.barcode.nativeElement.focus();
  }

  getPrinter() {
    this.waitMessage = 'verificando impressora';
    this.barcodeService.getPrinterStatus().subscribe({
      next: status => {
        localStorage.setItem('printerstatus', JSON.stringify(status.ret));
        setTimeout(() => {
          this.printerOK = true;
        }, 200);
      },
      error: valor => {
        localStorage.setItem('printerstatus', JSON.stringify(valor.error.ret));
        const source = interval(3000);
        const e = source.pipe(
          mergeMap(val => {
            this.waitMessage = `ainda verificando impressora (${val + 1})`;
            if (val > 3) {
              return throwError('Error!');
            }
            return of(valor);
          })
        );

        e.subscribe({
          next: val => void(0),
          error: val => {
            console.log(`${val}: tentou mais duas vezes e parou!`);
            setTimeout(() => {
              this.router.navigate(['perror'], {relativeTo: this.route});
            }, 1500);
           }
        });
      }
    });
  }

  getBarcode(barcode: string) {
    Global.FLOW.codigo = barcode;
    if (barcode) {
      this.showLoading = true;
      this.hide = true;
      this.barcodeService.getcomanda(barcode).subscribe({
        next: (valor: ComandaInfo) => {
          Global.FLOW.valor = valor.ret.total.toFixed(2).toString().replace('.', ',');
          Global.FLOW.comanda = valor.ret;
          setTimeout(() => {
            this.router.navigate(['lista']);
          }, 200);
        },
        error: valor => {
          const source = interval(1000);
          const example = source.pipe(
            mergeMap(val => {
              if (val > 3) {
                this.waitMessage = 'algo deu errado! tentando novamente';
                return throwError('Error!');
              }
              return of(valor);
            }),
            retry(2)
          );

          example.subscribe({
            next: val => void(0),
            error: val => {
              console.log(`${val}: tentou mais duas vezes e parou!`);
              setTimeout(() => {
                this.router.navigate(['error'], {relativeTo: this.route});
              }, 1500);
             }
          });
        }
      });
    }
  }
}
