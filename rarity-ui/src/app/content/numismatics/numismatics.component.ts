import { Component, OnInit } from '@angular/core';

import { NumismaticsService } from '../numismatics.service';

@Component({
  templateUrl: './numismatics.component.html',
  styleUrls: ['./numismatics.component.scss'],
  host: {
    'class': 'row mt-3'
  }
})
export class NumismaticsComponent implements OnInit {
  
  materialFilters: Array<any> = [];
  denominationFilters: Array<any> = [];  

  monetaryPeriodId: string;

  refreshed: boolean = true;
    
  coins: Array<any> = [];

  selectedDenomination: string;
  selectedMaterial: string;

  constructor(private numismaticsService: NumismaticsService) { }

  ngOnInit() {
  }

  onNavChanged(filters: any): void {
    this.refreshed = true;

    this.materialFilters = filters.materialFilters;
    this.denominationFilters = filters.denominationFilters;

    if (filters.monetaryPeriodId) {
      this.monetaryPeriodId = filters.monetaryPeriodId;
        this.numismaticsService.findAll(filters.monetaryPeriodId)
            .subscribe(coins => {
                this.coins = coins;
            })
    }

  }

  onDenominationChanged(denomination?: string): void {
    
    this.refreshed = false;
    this.selectedDenomination = denomination;

    this.triggerFilterRequest();

  }

  onMaterialChanged(material?: string): void {
    
    this.refreshed = false;
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
