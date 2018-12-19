import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from '../actions/auth.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { User } from 'app/models/user';
import { map, catchError, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FirestoreAuthService } from 'app/services/firestore-auth.service';
import { app } from 'firebase';

@Injectable()
export class AuthEffects {
constructor(private actions$: Actions, private fsAuth: FirestoreAuthService, private router: Router) {}

  @Effect()
  getUser: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.GET_USER).pipe(
    this.fsAuth.getAuthStatus,

    // authenticate
    map(a => {
      if (a) {
        /// User logged in
        return new AuthActions.Authenticated(a.uid);
      } else {
        return new AuthActions.NotAuthenticated();
      }
    }),

    catchError(err => {
      return of(new AuthActions.AuthError(err));
    })
  );

  @Effect()
  authenticated: Observable<Action> = this.actions$.ofType<AuthActions.Authenticated>(AuthActions.AuthActionTypes.AUTHENTICATED).pipe(
    map((a: AuthActions.Authenticated) => a.payload),

    this.fsAuth.getRegisteredUser,

    map(res => {
      if (typeof res === 'string') {
        return new AuthActions.AuthenticatedNotRegistered(res);
      } else {
        return new AuthActions.AuthenticatedRegistered(res);
      }
    }),

    catchError(err => {
      return of(new AuthActions.AuthError(err));
    })
  );

  @Effect()
  logout: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.LOGOUT).pipe(
    this.fsAuth.signOut,

    map(() => {
      return { type: 'NO_ACTION' };
    }),

    tap(() => {
      return this.router.navigate(['']);
    }),

    catchError(err => of(new AuthActions.AuthError(err)))
  );

  @Effect()
  register: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.REGISTER).pipe(
    ofType<AuthActions.Register>(AuthActions.AuthActionTypes.REGISTER),

    switchMap(action => this.fsAuth.registerUser()),

    map(() => {
      return { type: 'NO_ACTION' };
    }),

    catchError(err => of(new AuthActions.AuthError(err)))
  );

  @Effect()
  login: Observable<Action> = this.actions$.ofType(AuthActions.AuthActionTypes.LOGIN).pipe(
    this.fsAuth.signIn,

    map(c => new AuthActions.GetUser()),

    catchError(err => of(new AuthActions.AuthError(err)))
  );
}
