import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrentSession {

    private loggedIn: boolean;
    private displayName: string;
    private email: string;
    private sharedCollection: Subject<any> = new Subject<any>();
    private sharedCollections: Subject<Array<any>> = new Subject<Array<any>>();

    setDisplayName(displayName: string): void {
        this.displayName = displayName;
    }

    getDisplayName(): string {
        return this.displayName;
    }
    
    setEmail(email: string): void {
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }

    setLoggedIn(loggedIn: boolean): void {
        this.loggedIn = loggedIn;
        if (!loggedIn) {
            this.clean();
        }
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

    setSharedCollection(sharedCollection: string): void {
        this.sharedCollection.next(sharedCollection);
    }

    getSharedCollection(): Observable<any> {
        return this.sharedCollection.asObservable();
    }

    setSharedCollections(sharedCollections: Array<any>): void {
        this.sharedCollections.next(sharedCollections);
    }

    getSharedCollections(): Observable<Array<any>> {
        return this.sharedCollections.asObservable();
    }

    private clean(): void {
        this.displayName = null;
        this.email = null;
        this.sharedCollection.next();
        this.sharedCollections.next();
    }

}
