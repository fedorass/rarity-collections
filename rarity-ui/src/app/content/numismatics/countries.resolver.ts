import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CountryService } from '../country.service';
import { CurrentSession } from '../../session.service'

@Injectable()
export class CountriesResolver implements Resolve<Observable<any[]>> {

    constructor(private countryService: CountryService, private currentSession: CurrentSession) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {

        let email =  this.currentSession.getEmail();
        return this.countryService.findAll(email).pipe(
            map(countries => {
                return countries.map(country => {
                    return {
                        value: country.countryId, 
                        label: country.name,
                        materials: country.materials
                      }
                });
            })
        );
    }

}