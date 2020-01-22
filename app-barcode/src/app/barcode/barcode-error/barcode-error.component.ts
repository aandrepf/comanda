import { Component, OnInit } from '@angular/core';
import { ModalInputService } from 'src/app/shared/modal-input.service';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barcode-error',
  templateUrl: './barcode-error.component.html',
  styleUrls: ['./barcode-error.component.css']
})
export class BarcodeErrorComponent implements OnInit {

  nome = 'Componente operational';
  waitMessage = 'erro ao processar código da comanda!';

  constructor(private modal: ModalInputService, private router: Router) {
    const body$ = document.querySelector('body');
    body$.classList.remove('barcode-back');
    body$.classList.add('system-danger');

    if (!Global.FLOW) {
      this.router.navigate(['/']);
      body$.classList.remove('system-danger');
    }
  }

  ngOnInit() {
    setTimeout(() => {
      if (Global.FLOW) {
        this.openManualBarcodeInput();
      }
    }, 5000);
  }

  openManualBarcodeInput() {
    this.modal.openModalInput();
  }

}
