import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NumismaticsComponent } from './content/numismatics/numismatics.component';
import { NavigationComponent } from './content/navigation/navigation.component';
import { CoinComponent } from './content/coin/coin.component';
import { FilterComponent } from './content/filter/filter.component';
import { PaginationComponent } from './content/pagination/pagination.component';

import { LoginComponent } from './login/login.component';

import { CountryService } from './content/country.service';
import { CountriesResolver } from './content/numismatics/countries.resolver';
import { MonetaryPeriodService } from './content/monetary-period.service';
import { NumismaticsService } from './content/numismatics.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NumismaticsComponent,
    NavigationComponent,
    CoinComponent,
    FilterComponent,
    PaginationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [
    MDBSpinningPreloader,
    CountryService,
    MonetaryPeriodService,
    NumismaticsService,
    {
      provide: 'API_ENDPOINT', useValue: 'https://vqmfad9j56.execute-api.eu-central-1.amazonaws.com/dev/api' //dev 'http://localhost:3000/api'
    },
    CountriesResolver
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
