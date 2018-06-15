import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CountryService {

  constructor(private http: HttpClient, @Inject('API_ENDPOINT') private baseUrl: string) {

   }

   findAll(userId: string): Observable<any[]> {

    const queryUrl = `${this.baseUrl}/users/${userId}/countries`;

    return this.http.get<any[]>(queryUrl);
   }

}
