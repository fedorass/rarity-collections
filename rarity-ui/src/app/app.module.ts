import { BrowserModule } from '@angular/platform-browser';

import { MDBBootstrapModules } from 'ng-mdb-pro';
import { MDBSpinningPreloader } from 'ng-mdb-pro';

import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NumismaticsComponent } from './content/numismatics/numismatics.component';
import { NavigationComponent } from './content/navigation/navigation.component';
import { CoinComponent } from './content/coin/coin.component';

import { CountryService } from './content/country.service';
import { MonetaryPeriodService } from './content/monetary-period.service';
import { NumismaticsService } from './content/numismatics.service';
import { FilterComponent } from './content/filter/filter.component';
import { PaginationComponent } from './content/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NumismaticsComponent,
    NavigationComponent,
    CoinComponent,
    FilterComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MDBBootstrapModules.forRoot()
  ],
  providers: [
    MDBSpinningPreloader,
    CountryService,
    MonetaryPeriodService,
    NumismaticsService,
    {
      provide: 'API_ENDPOINT', useValue: 'http://localhost:3000/api'
    }
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
