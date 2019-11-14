import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css', './btn-style.scss']
})
export class SuccessComponent implements OnInit {
  body$;
  nome = 'Componente operational';
  waitMessage = 'O pagamento da sua comanda foi processado com sucesso!';

  constructor(private router: Router) {
    this.body$ = document.querySelector('body');
    this.body$.classList.add('system-ok');
  }

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/barcode']);
  }

  goRate() {
    console.log('Avaliar experiência!');
  }

}
