import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from '../social-auth.service';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
  }

  signIn(): void {
    this.authService.signIn();
  }

  signOut(): void {
    this.authService.signOut();
  }

  getUserName(): string {
    return this.authService.getDisplayName();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
