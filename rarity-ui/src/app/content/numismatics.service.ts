import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const LAST_EVALUATED_KEY_HEADER_NAME = 'x-last-evaluated-key';

@Injectable()
export class NumismaticsService {

  constructor(private http: HttpClient, @Inject('API_ENDPOINT') private baseUrl: string) { 
  }

  findAll(monetaryPeriodId: string, query: string, lastEvaluatedKey?: any): Observable<any> {

    let queryUrl: string = `${this.baseUrl}/periods/${monetaryPeriodId}/coins`;

    if (query) {
      queryUrl = queryUrl.concat('?', query);
    }

    const headers = new HttpHeaders();
    headers.set(LAST_EVALUATED_KEY_HEADER_NAME, lastEvaluatedKey);

    return this.http.get<any[]>(queryUrl, { headers: headers, observe: 'response' }).pipe(
      map(response => {
        const lastEvaluatedKey = response.headers.get(LAST_EVALUATED_KEY_HEADER_NAME);

        return {
          lastEvaluatedKey: lastEvaluatedKey,
          content: response.body
        }
      })
    );

  }

}
