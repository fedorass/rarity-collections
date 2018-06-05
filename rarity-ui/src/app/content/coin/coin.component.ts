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
  @Input() country: string;   
  
  private IMG_BASE_URL: string = 'https://s3.eu-central-1.amazonaws.com/ua.numismatics.oleksandr.fedoras.static.images/numismatics/countries/';
  
  constructor() { }

  ngOnInit() {
  }

  buildObverseImageUrl(): string {
    return this.IMG_BASE_URL + `${this.country}/monetary-periods/${this.coin.periodId}/coins/${this.coin.coinId}/obverse.png`;
  }

  buildReverseImageUrl(): string {
    return this.IMG_BASE_URL +  `${this.country}/monetary-periods/${this.coin.periodId}/coins/${this.coin.coinId}/reverse.png`;
  }

}
