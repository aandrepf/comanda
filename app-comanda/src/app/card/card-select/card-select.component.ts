import { Global } from 'src/app/global';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.component.html',
  styleUrls: ['./card-select.component.css', './btn-style.scss']
})
export class CardSelectComponent implements OnInit {

  constructor(private router: Router) {
    console.log('flow ==> select card', Global.FLOW);
    if (!Global.FLOW) { this.router.navigate(['/barcode']); }
  }

  ngOnInit() {}

  selectCard(type: number) {
    Global.FLOW.tipoCartao = type;
    setTimeout(() => { this.router.navigate(['cpfnota']); }, 200);
  }

}
