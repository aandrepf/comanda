import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInputComponent } from './modal-input/modal-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  declarations: [ModalInputComponent],
  exports: [ModalInputComponent],
  entryComponents: [ModalInputComponent]
})
export class SharedModule { }
