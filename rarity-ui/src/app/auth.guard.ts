import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CurrentSession } from './session.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private currentSession: CurrentSession) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if ( this.currentSession.isLoggedIn() ) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
