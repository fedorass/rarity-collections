import { Injectable, Inject } from '@angular/core';

import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';

@Injectable()
export class NumismaticsService {

  constructor(private http: Http, @Inject('API_ENDPOINT') private baseUrl: string) { 

  }

  findAll(monetaryPeriodId: string, query?: string): Observable<any[]> {

    let queryUrl: string = `${this.baseUrl}/periods/${monetaryPeriodId}/coins`;

    if (query) {
      queryUrl = queryUrl.concat('?', query);
    }

    return this.http.get(queryUrl).map((response: Response) => {
      return (<any>response.json()).map(item => {
        return item;
      });
    });
   }

}
