import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';

@Component({
  selector: 'app-cpf-base',
  templateUrl: './cpf-base.component.html',
  styleUrls: ['./cpf-base.component.css', './btn-style.scss']
})
export class CpfBaseComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log('flow ==> cpf base', Global.FLOW);
    if (!Global.FLOW) { this.router.navigate(['/barcode']); }
  }

  includeCPF() {
    console.log('escolheu incluir CPF!');
    this.router.navigate(['incluir']);
  }

  notIncludeCPF() {
    console.log('não escolheu incluir CPF!');
    // tslint:disable-next-line: max-line-length
    const url = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/app/#/sitef-sale?type=${Global.FLOW.tipoServico}&val=${Global.FLOW.valor}&doc=${Global.FLOW.cpf}&card=${Global.FLOW.tipoCartao}`;
    window.location.href = url;
  }

  goBack() {
    this.router.navigate(['/lista']);
  }

}
