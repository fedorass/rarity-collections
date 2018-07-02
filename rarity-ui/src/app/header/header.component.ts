import { Component, OnInit } from '@angular/core';

import { SocialAuthService } from '../social-auth.service';
import { CurrentSession } from '../session.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  publicCollections: Array<any> = [];
  currentCollection: string;

  constructor(private authService: SocialAuthService, private currentSession: CurrentSession, private messageService: MessageService) { }

  ngOnInit() {
    this.currentSession.getSharedCollections().subscribe(publicCollections => {
      this.publicCollections = publicCollections;
    });

    this.currentSession.getSharedCollection().subscribe(currentCollection => {
      this.currentCollection = currentCollection;
    });
  }

  signIn(): void {
    this.authService.signIn();
  }

  signOut(): void {
    this.authService.signOut();
  }

  getUserName(): string {
    return this.currentSession.getDisplayName();
  }

  isLoggedIn(): boolean {
    return this.currentSession.isLoggedIn();
  }

  setSharedCollection(sharedCollection?: string): void {
    this.currentSession.setSharedCollection(sharedCollection);
  }

  getSharedCollection(): string {
      return this.currentCollection;
  }

}
