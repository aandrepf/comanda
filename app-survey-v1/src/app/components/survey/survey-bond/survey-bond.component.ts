import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IBond, IBondConfig } from 'src/app/models/survey.model';

@Component({
    selector: 'app-survey-bond',
    templateUrl: './survey-bond.component.html',
    styleUrls: ['./survey-bond.component.css']
})
export class SurveyBondComponent implements OnInit {

    @Input() bondConfig: IBondConfig;

    public bondForm: FormGroup;
    public bondInfo: IBond = {
        cpf: '',
        cnpj: '',
        agcc: '',
        cel: '',
        phone: '',
        matricula: '',
        obs: '',
        name: '',
        comment: ''
    };

    private _formSubmitAttempt = false;

    @Output() evt = new EventEmitter<IBond>();

    constructor(private fb: FormBuilder) { }

    loadForm() {
        this.bondForm = this.fb.group({
            comment: [''],
            name: [''],
            cel: [''],
            cpf: [''],
            cnpj: [''],
            agcc: [''],
            phone: [''],
            matricula: [''],
            barcode: [''],
            obs: ['']
        });
    }

    ngOnInit() {
        this.loadForm();
    }

    onSubmit() {

        if (this.bondForm.valid) {

            /*this.bondInfo = {
                comment: this.bondForm.value.comment,
                name: this.bondForm.value.name,
                cel: this.bondForm.value.cel,
                cpf: this.bondForm.value.cpf,
                cnpj: this.bondForm.value.cnpj,
                agcc: this.bondForm.value.agcc,
                phone: this.bondForm.value.phone,
                matricula: this.bondForm.value.matricula,
                obs: this.bondForm.value.obs,
                barcode: this.bondForm.value.barcode
            };*/

            this.bondInfo.name = this.bondForm.value.name;
            this.bondInfo.comment = this.bondForm.value.comment;

            this.evt.emit(this.bondInfo);

        }

        this._formSubmitAttempt = true;

    }

}
