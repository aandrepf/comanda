import { BarcodeService } from './../../barcode/barcode.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Global } from 'src/app/global';
import { interval, throwError, of } from 'rxjs';
import { mergeMap, retry } from 'rxjs/operators';

@Component({
  selector: 'app-modal-input',
  templateUrl: './modal-input.component.html',
  styleUrls: ['./modal-input.component.css']
})
export class ModalInputComponent implements OnInit {
  myForm: FormGroup;
  values = '';
  hide = false;
  hideForm = false;
  waitMessage = 'verificando o código';

  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder, private router: Router,
    private spinner: NgxSpinnerService, private barcodeService: BarcodeService) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      codigo: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  insertNumber(number: string) {
    this.values += number;

    if (this.values.length > 4) {
      this.values = this.values.substring(0, this.values.length - 1);
    }

    this.myForm.patchValue({
      codigo: this.values
    });
  }

  deleteNumber() {
    this.values = this.values.substring(0, this.values.length - 1);
    this.myForm.patchValue({
      codigo: this.values
    });
  }

  limparForm() {
    this.values = '';
    this.myForm.reset();
  }

  onClose() {
    this.bsModalRef.hide();
  }

  onCancel() {
    this.onClose();
    document.querySelector('body').classList.remove('system-danger');
    this.router.navigate(['']);
  }

  onSubmit() {
    console.log('modal submit');
    Global.FLOW.codigo = this.myForm.value.codigo;
    if (this.myForm.valid) {
      this.spinner.show();
      this.hideForm = true;
      this.barcodeService.getcomanda(this.myForm.value.codigo).subscribe({
        next: valor => {
          Global.FLOW.comanda = valor;
          setTimeout(() => { this.router.navigate(['lista']); }, 200);
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
              this.hide = true;
              this.spinner.hide();
             }
          });
        }
      });
    }
  }

}
