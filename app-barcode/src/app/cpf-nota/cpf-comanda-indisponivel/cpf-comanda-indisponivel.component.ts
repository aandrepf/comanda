import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpf-comanda-indisponivel',
  templateUrl: './cpf-comanda-indisponivel.component.html',
  styleUrls: ['./cpf-comanda-indisponivel.component.css', './btn-style.scss']
})
export class CpfComandaIndisponivelComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  back() {
    this.router.navigate(['/barcode']);
  }

}
