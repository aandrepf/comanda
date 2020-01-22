import { Directive, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { VkbmaskService } from 'src/app/services/vkbmask.service';
import { NgControl } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[vkbMask]',
})
export class VkbMaskDirective implements OnInit, OnDestroy {

    @Input('vkbMask') vkbMask: string;
    private _subscription: any;

    ngOnInit() {

        const ctrl = this._ngControl.control;
        this._subscription = ctrl.valueChanges.subscribe(v => {

            let val = '';

            switch (this.vkbMask) {
                case 'comment':
                    val = this._service.formatToComment(v);
                    break;
                case 'name':
                    val = this._service.formatToName(v);
                    break;
                case 'matricula':
                    val = this._service.formatToMatricula(v);
                    break;
                case 'cpf':
                    val = this._service.formatToCpf(v);
                    break;
                case 'cnpj':
                    val = this._service.formatToCnpj(v);
                    break;
                case 'phone':
                    val = this._service.formatToPhone(v);
                    break;
                case 'cel':
                    val = this._service.formatToCel(v);
                    break;
                case 'agcc':
                    val = this._service.formatToAgcc(v);
                    break;
                default:
                    val = v;
                    break;
            }

            ctrl.setValue(val, { emitEvent: false });

            setTimeout(() => {
                this._elementRef.nativeElement.setSelectionRange(val.length, val.length);
                this._elementRef.nativeElement.focus();
            }, 0);

        });

    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    constructor(private _service: VkbmaskService, private _ngControl: NgControl, private _elementRef: ElementRef) { }

}
