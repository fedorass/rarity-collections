import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";

import { CurrentSession } from './session.service';

@Injectable()
export class SocialAuthService {

  constructor(private authService: AuthService, private currentSession: CurrentSession, private router: Router) { 

    this.authService.authState.subscribe((user) => {
      if (user != null) {
        this.currentSession.setLoggedIn(true);
        this.currentSession.setDisplayName(user.name);
        this.currentSession.setEmail(user.email);
      }
      else {
        this.currentSession.setLoggedIn(false);
      }
    });
  }

  signIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((result) => {

      this.router.navigate(['/numismatics']);
      },
      (error) => {
        console.error('Error: ' + JSON.stringify(error));
      }
    );
  }

  signOut() {
    this.authService.signOut().then(result => {
      this.currentSession.setLoggedIn(false);
      this.router.navigate(['/login']);
    });
  }
}
