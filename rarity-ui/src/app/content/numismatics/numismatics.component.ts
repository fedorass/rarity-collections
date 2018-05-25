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
    
  coins: Array<any> = [];

  constructor(private numismaticsService: NumismaticsService) { }

  ngOnInit() {

  }

  onFilterChanged(filters: any): void {
    this.materialFilters = filters.materialFilters;
    this.denominationFilters = filters.denominationFilters;

    if (filters.monetaryPeriodId) {
        this.numismaticsService.findAll(filters.monetaryPeriodId)
            .subscribe(coins => {
                this.coins = coins;
            })
    }

  }

}
