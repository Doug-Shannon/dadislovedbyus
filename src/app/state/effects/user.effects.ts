import { FirestoreUserService } from '../../services/firestore-user.service';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as UserActions from '../actions/user.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from 'app/models/user';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private fsUserService: FirestoreUserService) {}

  @Effect()
  getUsers: Observable<Action> = this.actions$.ofType<UserActions.GetUsers>(UserActions.UserActionTypes.GET_USERS).pipe(
    switchMap(() => this.fsUserService.getUsers),

    map((users: User[]) => {
      return new UserActions.GetUserSuccess(users);
    }),

    catchError(err => {
      return of(new UserActions.Error(err));
    })
  );

  @Effect()
  error: Observable<Action> = this.actions$.ofType<UserActions.Error>(UserActions.UserActionTypes.ERROR).pipe(
    map(action => {

      return { type: 'NO_ACTION' };
    })
  );
}
