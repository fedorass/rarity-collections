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
  
  private IMG_BASE_URL: string = 'https://bank.gov.ua/control/uk/currentmoney/image?';
  
  constructor() { }

  ngOnInit() {
  }

  buildImageUrl(image: string): string {
    return this.IMG_BASE_URL + image;
  }

}
