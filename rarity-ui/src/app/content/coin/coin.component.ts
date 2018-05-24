import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss'],
  host: {
    'class': 'card mt-3'
  }
})
export class CoinComponent implements OnInit {

  /*coin: any = {
            valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
            coinId: 'e7d44e4d-8d38-4365-9e62-401610910f15',
            date: '07/05/1995',
            obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=1&g=2&s=0",
            reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=1&g=2&s=1",
            metal: 'мельхіор'
        };*/
  
  @Input() coin: any;      
        
  constructor() { }

  ngOnInit() {
  }

}
