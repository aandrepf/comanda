import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalInputComponent } from './modal-input/modal-input.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalInputService {
  private readonly HUB = `${environment.API}`;
  constructor(private modalService: BsModalService, private http: HttpClient) {}

  private showModalInput(dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(ModalInputComponent, { animated: true, ignoreBackdropClick: true });
    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  openModalInput() {
    this.showModalInput();
  }

  closeModalInput() {
    this.showModalInput(1500);
  }
}
