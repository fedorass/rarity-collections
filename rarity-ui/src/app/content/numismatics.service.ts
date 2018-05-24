import { Injectable, Inject } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';

@Injectable()
export class NumismaticsService {

  constructor(private http: Http, @Inject('API_ENDPOINT') private baseUrl: string) { 

  }

  findAll(monetaryPeriodId: string): Observable<any[]> {

    const queryUrl = `${this.baseUrl}/periods/${monetaryPeriodId}/coins`;

    return this.http.get(queryUrl).map((response: Response) => {
      return (<any>response.json()).map(item => {
        return item;
      });
    });
   }

}
