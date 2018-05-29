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
  
  @Input() coin: any;  
  @Input() coutry: string;   
  
  private IMG_BASE_URL: string = 'https://bank.gov.ua/control/uk/currentmoney/image?';
  
  constructor() { }

  ngOnInit() {
  }

  buildObverseImageUrl(): string {
    return `assets/images/numismatics/coutries/${this.coutry}/monetary-periods/${this.coin.periodId}/coins/${this.coin.coinId}/obverse.png`;
  }

  buildReverseImageUrl(): string {
    return `assets/images/numismatics/coutries/${this.coutry}/monetary-periods/${this.coin.periodId}/coins/${this.coin.coinId}/reverse.png`;
  }

}
