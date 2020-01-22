import { BarcodeService } from './../../barcode/barcode.service';
import { Component, Input, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Pad } from './numpad/numpad';
import { ValidateBrService } from 'angular-validate-br';
import { SlideInOutAnimation } from './animation';
import { Global } from 'src/app/global';
import { RoutingState } from 'src/app/routingState.service';
import { LockInfo } from 'src/app/models/comanda';
import { interval, throwError, of } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';

export class CRM {
  cpf: string;
}

@Component({
  selector: 'app-cpf-input',
  templateUrl: './cpf-input.component.html',
  styleUrls: ['./cpf-input.component.css'],
  animations: [SlideInOutAnimation]
})
export class CpfInputComponent implements OnInit {
  @Input() public valorPad = '';
  public animationState = 'out';
  public crmForm: FormGroup;
  public crmInfo: CRM;
  payBtnText;
  showLoading;
  msg;

  @ViewChild('cpfInput') cpfInput: ElementRef;

  constructor(private fb: FormBuilder, private router: Router, private validate: ValidateBrService, private routingState: RoutingState,
    private barcodeService: BarcodeService, private route: ActivatedRoute) {
    console.log('flow ==> cpf input', Global.FLOW);
    if (!Global.FLOW) { this.router.navigate(['/barcode']); }
    this.loadForm();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
   event.returnValue = false;
   event.preventDefault();
  }

  ngOnInit() {
    this.routingState.getHistory();
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
        this.payComanda();
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
            // tslint:disable-next-line: max-line-length
            const url = `${Global.IPC.protocol}://${Global.IPC.endpoint}:5000/app/#/sitef-sale?type=${Global.FLOW.tipoServico}&val=${Global.FLOW.valor}&doc=${Global.FLOW.cpf}&card=${Global.FLOW.tipoCartao}`;
            window.location.href = url;
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

}
