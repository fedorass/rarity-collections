import { Component, OnInit } from '@angular/core';

import { NumismaticsService } from '../numismatics.service';

@Component({
  templateUrl: './numismatics.component.html',
  styleUrls: ['./numismatics.component.scss'],
  host: {
    'class': 'main col-12 h-100 py-3'
  }
})
export class NumismaticsComponent implements OnInit {
  
  materialFilters: Array<any> = [];
  denominationFilters: Array<any> = [];  
    
  coins: Array<any> = [];

  constructor(private numismaticsService: NumismaticsService) { }

  ngOnInit() {
    /*this.coins = [
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: 'e7d44e4d-8d38-4365-9e62-401610910f15',
          date: '07/05/1995',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=1&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=1&g=2&s=1",
          metal: "мельхіор"
      },

      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: 'a03cfaed-c611-4bbc-bb40-af0942ad4057',
          date: '19/07/1995',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=2&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=2&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: '2bea2fdd-8446-45f8-af51-e956d4635665',
          date: '23/08/1995',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=4&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=4&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: 'ba96e84d-e876-4611-9962-bcf98d6f5d4c',
          date: '23/08/1995',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=5&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=5&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: 'adbd1672-76a6-44fa-80fb-7408535aa249',
          date: '23/08/1995',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=6&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=6&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: '73aece13-ba43-4f8c-b8c9-8b019e2a2caf',
          date: '23/08/1995',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=7&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=7&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: 'd0e56b1b-376f-4738-858e-49d6a203ac80',
          date: '01/03/1996',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=10&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=10&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: '0f5a745b-8ce2-4097-9829-8c7415af5f95',
          date: '07/03/1996',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=8&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=8&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: '3bd27d90-a520-4043-bb7c-c6e564d70210',
          date: '25/04/1996',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=12&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=12&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: '95202911-7e7d-4b57-b7a4-b6e401caefd8',
          date: '10/07/1996',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=16&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=16&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: '359f6639-c9e9-4480-a5df-5af2e3af16c7',
          date: '10/07/1996',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=14&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=14&g=2&s=1",
          metal: "мельхіор"
      },
      {
          valueId: 'dd308f3f-fe61-4398-a12b-fa1932979ea2',
          coinId: '854b3b27-f1d4-43b4-8705-207bd484f94c',
          date: '09/08/1996',
          obverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=19&g=2&s=0",
          reverse: "https://bank.gov.ua/control/uk/currentmoney/image?id=19&g=2&s=1",
          metal: "мельхіор"
      }
    ]*/
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
