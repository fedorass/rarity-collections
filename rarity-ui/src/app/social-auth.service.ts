import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';

import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";

@Injectable()
export class SocialAuthService {

  private loggedIn: boolean;
  private user: SocialUser;

  constructor(private authService: AuthService, private router: Router) { 
    this.loggedIn = false;
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(result => {
      this.loggedIn = true;
      this.router.navigate(['/numismatics'])
    } );
  }

  signOut() {
    this.authService.signOut().then(result => {
      this.loggedIn = false;
      this.router.navigate(['/login'])
    });
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getDisplayName(): string {
    return this.user.name;
  }

  getEmail(): string {
    return this.user.email;
  }

}
