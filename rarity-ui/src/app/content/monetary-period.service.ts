import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MonetaryPeriodService {

  constructor(private http: HttpClient, @Inject('API_ENDPOINT') private baseUrl: string) {

  }

  findAll(countryId: string): Observable<any[]> {

    const queryUrl = `${this.baseUrl}/countries/${countryId}/periods`;

    return this.http.get<any[]>(queryUrl);

   }

}
