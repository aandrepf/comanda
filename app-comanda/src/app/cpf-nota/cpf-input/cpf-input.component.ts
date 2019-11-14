import { Component, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pad } from './numpad/numpad';
import { ValidateBrService } from 'angular-validate-br';
import { SlideInOutAnimation } from './animation';
import { Global } from 'src/app/global';

export class CRM {
  cpf: string;
}

@Component({
  selector: 'app-cpf-input',
  templateUrl: './cpf-input.component.html',
  styleUrls: ['./cpf-input.component.css'],
  animations: [SlideInOutAnimation]
})
export class CpfInputComponent {
  @Input() public valorPad = '';
  public animationState = 'out';
  public crmForm: FormGroup;
  public crmInfo: CRM;

  @ViewChild('cpfInput') cpfInput: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private validate: ValidateBrService) {
    console.log('flow ==> cpf input', Global.FLOW);
    if (!Global.FLOW) { this.router.navigate(['/barcode']); }
    this.loadForm();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   event.returnValue = false;
   event.preventDefault();
  }

  loadForm() {
    this.crmInfo = new CRM();
    this.crmForm = this.fb.group({
      cpf: ['', [Validators.min(11), this.validate.cpf]]
    });
  }

  updateForm() {
    this.crmForm.setValue({
      cpf: this.valorPad
    });
  }

  toggleShowDiv(divName: string) {
    this.updateForm();
    this.animationState = 'out';
    if (divName === 'divA') {
      this.animationState = this.animationState === 'out' ? 'in' : 'out';
    }
  }

  recebeValue(valor: Pad) {
    if (valor.values.length === 11 && valor.clicou) {
      Global.FLOW.cpf = valor.values;
      setTimeout(() => {
        // tslint:disable-next-line: max-line-length
        const url = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/app/#/sitef-sale?type=${Global.FLOW.tipoServico}&val=${Global.FLOW.valor}&doc=${Global.FLOW.cpf}&card=${Global.FLOW.tipoCartao}`;
        window.location.href = url;
      }, 150);
    }
    this.valorPad = valor.values.trim().replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
    this.animationState = valor.animation;
    this.updateForm();
  }

}
