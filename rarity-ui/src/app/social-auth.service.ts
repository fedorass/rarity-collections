import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';

@Injectable()
export class SocialAuthService {

  private loggedIn: boolean;

  private userDetails: any = {
    displayName: 'Alexandr Fedoras',
    email: 'oleksandr.fedoras@gmail.com'
  };

  constructor(private router: Router) { 
    this.loggedIn = false;
  }

  signIn(): void {
    this.loggedIn = true;
    this.router.navigate(['/numismatics'])
  }

  signOut() {
    this.loggedIn = false;
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getDisplayName(): string {
    return this.userDetails.displayName;
  }

  getEmail(): string {
    return this.userDetails.email;
  }

}
