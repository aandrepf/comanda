import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-init',
  templateUrl: './survey-init.component.html',
  styleUrls: ['./survey-init.component.css', './btn-style.scss']
})
export class SurveyInitComponent implements OnInit {
  body$;
  nome = 'Componente operational';
  waitMessage = 'O pagamento da sua comanda foi processado com sucesso!';

  constructor(private router: Router) {
    this.body$ = document.querySelector('body');
    this.body$.classList.add('system-ok');
  }

  ngOnInit() {
  }

  goBack() {
    const url = 'http://localhost:5000/comanda';
    this.body$.classList.remove('system-ok');
    window.location.href = url;
  }

  goRate() {
    console.log('Avaliar experiência!');
    this.body$.classList.remove('system-ok');
    this.router.navigate(['/survey-home']);

  }

}
