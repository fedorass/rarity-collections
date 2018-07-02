import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SharedCollectionService } from '../shared.service';
import { CurrentSession } from '../../session.service'

const PUBLIC_COLLECTION_OWNER_ID = 'PUBLIC_COLLECTION';

@Injectable()
export class PublicCollectionsResolver implements Resolve<Observable<any[]>> {

    constructor(private sharedService: SharedCollectionService, private currentSession: CurrentSession) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {

        let email = this.currentSession.getEmail();
        return this.sharedService.getShared(PUBLIC_COLLECTION_OWNER_ID).pipe(
            map(collections => {
                let emails = collections.map(collection => {
                    return collection.userId;
                }).filter(item => {
                    return item !== email;
                });

                return emails;
            })
        );
    }

}