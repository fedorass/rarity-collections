import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CountryService } from '../country.service';
//import { SocialAuthService } from '../../social-auth.service'

//const DEFAULT_USER_ID = 'oleksandr.fedoras@gmail.com'; //'oleksandr.fedoras@gmail.com'
const DEFAULT_USER_ID = 'ce06f1b5-9d40-49fc-b61f-16b1ca006a30'; //'oleksandr.fedoras@gmail.com'
@Injectable()
export class CountriesResolver implements Resolve<Observable<any[]>> {

    constructor(private countryService: CountryService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {

        let email = DEFAULT_USER_ID;//this.authService.getEmail();
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