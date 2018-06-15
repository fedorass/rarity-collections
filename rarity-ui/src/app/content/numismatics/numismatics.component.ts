import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NumismaticsService } from '../numismatics.service';

const LAST_EVALUATED_KEY_HEADER_NAME = 'X-Last-Evaluated-Key';
const DEFAULT_PAGE_SIZE = 12;

@Component({
  templateUrl: './numismatics.component.html',
  styleUrls: ['./numismatics.component.scss'],
  host: {
    'class': 'row d-flex flex-grow'
  }
})
export class NumismaticsComponent implements OnInit {

  @ViewChild('coinsView') 
  coinsView: ElementRef;

  countries: Array<any> = [];

  materialFilters: Array<any> = [];
  denominationFilters: Array<any> = [];  

  countryId: string;
  monetaryPeriodId: string;

  coins: Array<any> = [];

  selectedDenomination: string;
  selectedMaterial: string;

  lastEvaluatedKeys: Array<any> = [{}];

  pageNumber: number = 0;

  constructor(private numismaticsService: NumismaticsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.countries = this.route.snapshot.data.countries;
  }

  onNavChanged(filters: any): void {

    this.materialFilters = filters.materialFilters;
    this.denominationFilters = filters.denominationFilters;
    this.countryId = filters.countryId;

    this.pageNumber = 0;
    this.lastEvaluatedKeys = [{}];

    if (filters.monetaryPeriodId) {
      this.monetaryPeriodId = filters.monetaryPeriodId;
      const query: string = 'pageSize=' + DEFAULT_PAGE_SIZE;
        this.numismaticsService.findAll(filters.monetaryPeriodId, query)
            .subscribe(responce => {
                this.coins = responce.content;
                this.lastEvaluatedKeys[this.pageNumber].next  = responce.lastEvaluatedKey;
            })
    }
    else {
       this.coins = [];
    }
  }

  onDenominationChanged(denomination?: string): void {
    
    this.selectedDenomination = denomination;
    if (this.selectedDenomination) {
      this.pageNumber = 0;
      this.lastEvaluatedKeys = [{}];
    }
    this.triggerFilterRequest();
  }

  onMaterialChanged(material?: string): void {

    this.selectedMaterial = material;
    if (this.selectedMaterial) {
      this.pageNumber = 0;
      this.lastEvaluatedKeys = [{}];
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

    queryParams.push('pageSize=' + DEFAULT_PAGE_SIZE);

    const query: string = queryParams.join('&');

    this.numismaticsService.findAll(this.monetaryPeriodId, query, this.lastEvaluatedKeys[this.pageNumber].current)
      .subscribe(responce => {
        this.coins = responce.content;
        this.lastEvaluatedKeys[this.pageNumber].next = responce.lastEvaluatedKey;
    });

    this.coinsView.nativeElement.scrollTop = 0;
  }

  getTotalPages(): number {
    if (this.coins.length) {
      return this.lastEvaluatedKeys.length;
    }
    else {
      return 0;
    }
  }

  onPageNumberChanged(pageNumber: number): void {
    if (!this.lastEvaluatedKeys[pageNumber]) {
      this.lastEvaluatedKeys.push({
        'current': this.lastEvaluatedKeys[this.pageNumber].next
      });
    }
    this.pageNumber = pageNumber;
    this.triggerFilterRequest();
  }

  hasMore(): boolean {
    return this.lastEvaluatedKeys[this.lastEvaluatedKeys.length - 1].next;
  }

}
