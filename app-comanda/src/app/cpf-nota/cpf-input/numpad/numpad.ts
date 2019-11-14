import { Component, EventEmitter, Output, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CRM } from '../cpf-input.component';
import { Global } from 'src/app/global';

export class Pad {
  values: string;
  animation: string;
  crm: CRM;
  clicou: boolean;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'numpad',
  templateUrl: './numpad.html'
})
export class NumPadComponent implements OnChanges {
  @Output() numValue: EventEmitter<Pad> = new EventEmitter();
  @Output() msgErroContinua: EventEmitter<string> = new EventEmitter();
  @Input() validado: boolean;

  public values = '';
  public disabled: boolean;
  public cadastro;

  constructor(private route: Router, private _spinner: NgxSpinnerService) {
    this.disabled = true;
    this.cadastro = new CRM();
  }

  ngOnChanges(): void {
    this.disabled = !this.validado && this.values.length === 11 ? false : true;
  }

  fecharPad() {
    const dado = this.values;
    const padValues = new Pad();
    if (dado.length === 0) {
      this.values = '';
      padValues.values = this.values;
      padValues.animation = 'out';
      padValues.clicou = false;
      this.numValue.emit(padValues);
      // localStorage.clear();
      // this.msgErroContinua.emit('Campo não pode ser vazio!');

    } else if (dado.length > 0 && dado.length < 11) {
      this.values = '';
      padValues.values = this.values;
      padValues.animation = 'out';
      padValues.clicou = true;
      this.numValue.emit(padValues);
      // localStorage.clear();
      // this.msgErroContinua.emit('Número de telefone inválido!');

    } else {
      this._spinner.show();
      padValues.values = dado;
      padValues.animation = 'out';
      padValues.clicou = true;
      this.numValue.emit(padValues);
    }
  }

  goBack() {
    const padValues = new Pad();
    padValues.values = '';
    padValues.animation = 'out';
    padValues.clicou = true;
    this.route.navigate(['/cpfnota']);
  }

  addValue(valor: string) {
    this.values += valor;
    if (this.values.length > 11) {
      this.values = this.values.substring(0, this.values.length - 1);
    }
    const padValues = new Pad();
    padValues.values = this.values.substring(0, 11);
    padValues.animation = 'in';
    this.numValue.emit(padValues);
  }

  apagaValor() {
    this.values = this.values.substring(0, this.values.length - 1);
    const padValues = new Pad();
    padValues.values = this.values;
    padValues.animation = 'in';
    this.numValue.emit(padValues);
  }
}
