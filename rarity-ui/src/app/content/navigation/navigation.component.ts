import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CountryService } from '../country.service';
import { MonetaryPeriodService } from '../monetary-period.service';

@Component({
  selector: 'grid-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  host: {
    'class': 'row'
  }
})
export class NavigationComponent implements OnInit {

  countries: Array<any>;

  monetaryPeriods: Array<any>;
  isPeriodsDisabled: boolean = true;

  selectedCountry: any;
  selectedMonetaryPeriod: any;

  @Output() onNavChanged = new EventEmitter<any>();

  constructor(private countryService: CountryService, private monetaryPeriodService: MonetaryPeriodService) { 

  }

  ngOnInit() {

    this.countryService.findAll('oleksandr.fedoras@gmail.com')
      .subscribe(countries => {
        this.countries = [];
        this.countries = countries.map(country => {
          return {
            value: country.countryId, 
            label: country.name,
            materials: country.materials
          }
        })
      });
  }

  countryChanged(country): void {
    this.selectedCountry = country;
    this.monetaryPeriods = [];
    this.selectedMonetaryPeriod = null;

    this.onNavChanged.emit({
      materialFilters: [],
      denominationFilters: [],
      countryId: this.selectedCountry.value,
    });

    this.monetaryPeriodService.findAll(country.value)
      .subscribe(monetaryPeriods => {    
        this.monetaryPeriods = monetaryPeriods.map(monetaryPeriod => {

          return {
            value: monetaryPeriod.periodId, 
            label: monetaryPeriod.startYear + ' - ' + ((monetaryPeriod.endYear)? monetaryPeriod.endYear : 'Now'),
            materials: monetaryPeriod.materials,
            denominations: monetaryPeriod.denominations
          }
        })

        this.isPeriodsDisabled = this.monetaryPeriods.length === 0;
      });


    this.isPeriodsDisabled = false;
  }

  monetaryPeriodChanged(monetaryPeriod): void {
    this.selectedMonetaryPeriod = monetaryPeriod;

    let materials: Array<any> = [];
    if (this.selectedCountry.materials) {
      materials = materials.concat(this.selectedCountry.materials);
    }

    if (this.selectedMonetaryPeriod.materials) {
      materials = materials.concat(this.selectedMonetaryPeriod.materials);
    }

    this.onNavChanged.emit({
      materialFilters: materials.map(item => {

        return {
          code: item.code,
          label: item.material
        }
      }),
      denominationFilters: this.selectedMonetaryPeriod.denominations.map(item => {

        return {
          code: item.code,
          label: item.denomination
        }
      }),
      monetaryPeriodId: this.selectedMonetaryPeriod.value,
      countryId: this.selectedCountry.value
    });
  }

}
