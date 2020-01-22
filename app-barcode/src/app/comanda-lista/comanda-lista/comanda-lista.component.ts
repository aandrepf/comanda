import { LockInfo } from './../../models/comanda';
import { RoutingState } from './../../routingState.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Comanda } from 'src/app/models/comanda';
import { Global } from 'src/app/global';
import { BarcodeService } from 'src/app/barcode/barcode.service';
import { mergeMap, retry } from 'rxjs/operators';
import { interval, throwError, of } from 'rxjs';

@Component({
  selector: 'app-comanda-lista',
  templateUrl: './comanda-lista.component.html',
  styleUrls: ['./comanda-lista.component.css', './btn-style.scss']
})
export class ComandaListaComponent implements OnInit {
  comandaPay: Comanda;
  isScroll: boolean;
  codigo;
  payBtnText = 'pagar comanda';
  showLoading: boolean;
  msg;
  comandaTeste: Comanda = {
    itens: [
      {
        descricao: '(demo) PIZZA MUSSARELA',
        preco: 19,
        valor: 19,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA CALABRESA',
        preco: 22,
        valor: 22,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA ATUM',
        preco: 25,
        valor: 25,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA 4 QUEIJOS',
        preco: 27,
        valor: 27,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA PORTUGUESA',
        preco: 27,
        valor: 27,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA FRANGO REQUEIJ',
        preco: 29,
        valor: 29,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA MARGHERITA',
        preco: 23,
        valor: 23,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA ESCAROLA',
        preco: 25,
        valor: 25,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA PEPPERONI',
        preco: 29,
        valor: 29,
        quantidade: 1
      },
      {
        descricao: '(demo) PIZZA A MODA DA CASA',
        preco: 29,
        valor: 29,
        quantidade: 1
      }
    ],
    total: 255,
    totalPagar: 280.5,
    subTotal: 0,
    percServico: 10,
    servico: 25.5,
    ticket: '{CFFCFCAA-05FE-E211-B9D5-5CF9DDEE7BF7}'
  };

  constructor(private barcodeService: BarcodeService, private router: Router, private routingState: RoutingState) {
    console.log('flow ==> lista comanda', Global.FLOW);
    document.querySelector('body').classList.remove('barcode-back');
  }

  ngOnInit() {
    this.showLoading = false;
    this.routingState.getHistory();
    this.msg = 'NÃO EXISTE REGISTRO PARA ESSA COMANDA!';
    if (Global.FLOW) {
      this.comandaPay = Global.FLOW.comanda;
      this.codigo = Global.FLOW.codigo;
      if (this.comandaPay.itens !== null) {
        if (this.comandaPay.itens.length > 0) {
          this.isScroll = this.comandaPay.itens.length > 5 ? true : false;
        } else {
          this.comandaPay = null;
          this.msg = 'ESSA COMANDA ESTÁ PAGA OU ESTÁ SEM ITENS DE CONSUMO!';
          setTimeout(() => {
            this.back();
          }, 15000);
        }
      } else {
        this.comandaPay = null;
        this.msg = 'OPS! SISTEMA ERP INDISPONÍVEL. POR FAVOR, ENTRAR EM CONTATO COM O RESPONSÁVEL DO ESTABELECIMENTO.';
        setTimeout(() => {
          this.back();
        }, 15000);
      }
    }
  }

  onScrollUp() { console.log('scrolled UP!!'); }
  onScrollDown() { console.log('scrolled down!!'); }

  payComanda() {
    this.router.navigate(['/card']);
    /* this.barcodeService.getLockComanda().subscribe({
      next: (valor: LockInfo) => {
        if (valor.ret.sts === 0) {
          setTimeout(() => {
            this.router.navigate(['/card']);
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
            this.cancelComanda();
           }
        });
      }
    }); */
  }

  cancelComanda() {
    this.comandaPay = null;
    this.msg = `ESSA COMANDA NÃO ESTÁ MAIS DISPONÍVEL!`;
  }

  back() {
    this.router.navigate(['/barcode']);
  }

}
