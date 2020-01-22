import { Global } from 'src/app/global';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingState } from 'src/app/routingState.service';

@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.component.html',
  styleUrls: ['./card-select.component.css', './btn-style.scss']
})
export class CardSelectComponent implements OnInit {

  constructor(private router: Router, private routingState: RoutingState) {
    console.log('flow ==> select card', Global.FLOW);
    if (!Global.FLOW) { this.router.navigate(['/barcode']); }
  }

  ngOnInit() {
    this.routingState.getHistory();
  }

  selectCard(type: number) {
    Global.FLOW.tipoCartao = type;
    setTimeout(() => { this.router.navigate(['cpfnota']); }, 200);
  }

  goBack() {
    this.router.navigate(['/']);
  }

}
