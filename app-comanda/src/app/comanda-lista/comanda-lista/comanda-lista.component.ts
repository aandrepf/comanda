import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ComandaInfo } from 'src/app/models/comanda';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-comanda-lista',
  templateUrl: './comanda-lista.component.html',
  styleUrls: ['./comanda-lista.component.css', './btn-style.scss']
})
export class ComandaListaComponent implements OnInit {
  comandaPay: ComandaInfo;
  isScroll: boolean;
  codigo;

  comandaTeste = [
    {desc: 'Item 2', cod: 1, val: 10.58, qtd: 88},
    {desc: 'Item 4', cod: 3, val: 10.58, qtd: 12},
    {desc: 'Item 6', cod: 5, val: 10.58, qtd: 60},
    {desc: 'Item 8', cod: 7, val: 10.58, qtd: 17},
    {desc: 'Item 10', cod: 9, val: 10.58, qtd: 10}
  ];

  constructor(private router: Router) {
    console.log('flow ==> lista comanda', Global.FLOW);
    document.querySelector('body').classList.remove('barcode-back');
    /* if (!Global.FLOW) {
      this.router.navigate(['/barcode']);
      this.comandaPay = null;
    } */
  }

  ngOnInit() {
    if (Global.FLOW) {
      this.comandaPay = Global.FLOW.comanda;
      this.codigo = Global.FLOW.codigo;
      this.isScroll = this.comandaPay.itens.length > 5 ? true : false;
    }
  }

  payComanda() {
    this.router.navigate(['/card']);
  }

  cancelComanda() {
    this.router.navigate(['/barcode']);
  }

}
