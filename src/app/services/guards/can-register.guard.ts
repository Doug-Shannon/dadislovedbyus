import { AuthState } from 'app/state/reducers/auth.reducer';
import { AppState } from 'app/state/reducers';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanRegister implements CanActivate {
  constructor(private store: Store<AppState>) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').pipe(
      filter((s: AuthState) => !s.loading),
      map((auth: AuthState) => auth.loggedIn && !auth.registered)
    );
  }
}
