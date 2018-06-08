import { Injectable, Inject } from '@angular/core';

import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';

const LAST_EVALUATED_KEY_HEADER_NAME = 'x-last-evaluated-key';

@Injectable()
export class NumismaticsService {

  constructor(private http: Http, @Inject('API_ENDPOINT') private baseUrl: string) { 
  }

  findAll(monetaryPeriodId: string, query: string, lastEvaluatedKey?: any): Observable<any> {

    let queryUrl: string = `${this.baseUrl}/periods/${monetaryPeriodId}/coins`;

    if (query) {
      queryUrl = queryUrl.concat('?', query);
    }

    const headers = new Headers();
    headers.set(LAST_EVALUATED_KEY_HEADER_NAME, lastEvaluatedKey);

    return this.http.get(queryUrl, { headers: headers }).map((response: Response) => {
      const lastEvaluatedKey = response.headers.get(LAST_EVALUATED_KEY_HEADER_NAME);

      return {
        lastEvaluatedKey: lastEvaluatedKey,
        content: (<any>response.json()).map(item => {
          return item;
        })
      }
    });
  }

}
