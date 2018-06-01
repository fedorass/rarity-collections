import { Component, OnInit } from '@angular/core';

import { NumismaticsService } from '../numismatics.service';

@Component({
  templateUrl: './numismatics.component.html',
  styleUrls: ['./numismatics.component.scss'],
  host: {
    'class': 'row d-flex flex-grow'
  }
})
export class NumismaticsComponent implements OnInit {
  
  materialFilters: Array<any> = [];
  denominationFilters: Array<any> = [];  

  countryId: string;
  monetaryPeriodId: string;

  coins: Array<any> = [];

  selectedDenomination: string;
  selectedMaterial: string;

  constructor(private numismaticsService: NumismaticsService) { }

  ngOnInit() {
  }

  onNavChanged(filters: any): void {

    this.materialFilters = filters.materialFilters;
    this.denominationFilters = filters.denominationFilters;
    this.countryId = filters.countryId;

    if (filters.monetaryPeriodId) {
      this.monetaryPeriodId = filters.monetaryPeriodId;
        this.numismaticsService.findAll(filters.monetaryPeriodId)
            .subscribe(coins => {
                this.coins = coins;
            })
    }
    else {
       this.coins = [];
    }

  }

  onDenominationChanged(denomination?: string): void {
    
    this.selectedDenomination = denomination;

    this.triggerFilterRequest();

  }

  onMaterialChanged(material?: string): void {

    this.selectedMaterial = material;

    this.triggerFilterRequest();

  }

  private triggerFilterRequest(): void {

    let queryParams: Array<string> = [];

    if (this.selectedDenomination) {
      queryParams.push(`denomination=${this.selectedDenomination}`);
    }

    if (this.selectedMaterial) {
      queryParams.push(`metal=${this.selectedMaterial}`);
    }

    const query: string = queryParams.join('&');

    this.numismaticsService.findAll(this.monetaryPeriodId, query)
      .subscribe(coins => {
        this.coins = coins;
      });

  }

}
