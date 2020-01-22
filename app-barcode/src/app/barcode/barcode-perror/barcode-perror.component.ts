import { Return } from './../../shared/startup';
import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barcode-perror',
  templateUrl: './barcode-perror.component.html',
  styleUrls: ['./barcode-perror.component.css']
})
export class BarcodePerrorComponent implements OnInit {
  nome = 'Componente operational';
  waitMessage;

  constructor(private router: Router) {
    const body$ = document.querySelector('body');
    body$.classList.remove('barcode-back');
    body$.classList.add('system-danger');

    if (!Global.FLOW) {
      this.router.navigate(['/']);
      body$.classList.remove('system-danger');
    }
  }

  ngOnInit() {
    const sts = JSON.parse(localStorage.getItem('printerstatus'));
    console.log(sts);
    this.waitMessage = `${sts.str} (${sts.code})`;
  }

}
