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
  
  PAGE_SIZE: number = 12;

  materialFilters: Array<any> = [];
  denominationFilters: Array<any> = [];  

  countryId: string;
  monetaryPeriodId: string;

  coins: Array<any> = [];

  selectedDenomination: string;
  selectedMaterial: string;

  pageNumber: number = 1;
  pageTotal: number = 1;

  constructor(private numismaticsService: NumismaticsService) { }

  ngOnInit() {
  }

  onNavChanged(filters: any): void {

    this.materialFilters = filters.materialFilters;
    this.denominationFilters = filters.denominationFilters;
    this.countryId = filters.countryId;

    this.pageNumber = 1;
    this.pageTotal = 0;
    if (filters.monetaryPeriodId) {
      this.monetaryPeriodId = filters.monetaryPeriodId;
      const query: string = '_limit=' + this.PAGE_SIZE;
        this.numismaticsService.findAll(filters.monetaryPeriodId, query)
            .subscribe(responce => {
                this.coins = responce.content;
                this.pageTotal = responce.totalCount;
            })
    }
    else {
       this.coins = [];
    }
  }

  onDenominationChanged(denomination?: string): void {
    
    this.selectedDenomination = denomination;
    if (this.selectedDenomination) {
      this.pageNumber = 1;
    }
    this.triggerFilterRequest();
  }

  onMaterialChanged(material?: string): void {

    this.selectedMaterial = material;
    if (this.selectedMaterial) {
      this.pageNumber = 1;
    }
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

    queryParams.push('_page=' + this.pageNumber);
    queryParams.push('_limit=' + this.PAGE_SIZE);

    const query: string = queryParams.join('&');

    this.numismaticsService.findAll(this.monetaryPeriodId, query)
      .subscribe(responce => {
        this.coins = responce.content;
        this.pageTotal = responce.totalCount;
        this.pageNumber = (responce.content)? this.pageNumber : 0;
      });
  }

  getTotalPages(): number {
    if (this.coins.length) {
      return Math.ceil(this.pageTotal / this.PAGE_SIZE);
    }
    else {
      return 0;
    }
    
  }

  onPageNumberChanged(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.triggerFilterRequest();
  }

}
