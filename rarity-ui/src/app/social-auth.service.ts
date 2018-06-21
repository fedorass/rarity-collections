import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from '@firebase/auth-types';
import { Observable } from 'rxjs';

@Injectable()
export class SocialAuthService {

  private user: Observable<User>;
  private userDetails: User = null;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) { 
      this.user = _firebaseAuth.authState;
      this.user.subscribe((user) => {
        if (user) {
          this.userDetails = user;
        }
        else {
          this.userDetails = null;
        }
      });
  }

  signIn(): Promise<any> {
    return this._firebaseAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider()).then((res) => this.router.navigate(['/numismatics']));
  }

  signOut() {
    this._firebaseAuth.auth.signOut().then((res) => this.router.navigate(['/login']));
  }

  isLoggedIn(): boolean {
    if (this.userDetails == null ) {
        return false;
      } else {
        return true;
      }
  }

  getDisplayName(): string {
    return this.userDetails.displayName;
  }

  getEmail(): string {
    return this.userDetails.email;
  }

}