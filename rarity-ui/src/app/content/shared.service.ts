import { Injectable, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SharedCollectionService {

  constructor(private http: HttpClient, @Inject('API_ENDPOINT') private baseUrl: string) {
  }

  getShared(ownerId: string): Observable<any[]> {

    const queryUrl = `${this.baseUrl}/shared/${ownerId}`;

    return this.http.get<any[]>(queryUrl);
  }

}
