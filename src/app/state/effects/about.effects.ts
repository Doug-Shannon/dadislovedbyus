import { FirestoreAboutService } from './../../services/firestore-about.service';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as AboutActions from '../actions/about.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AboutEffects {
  constructor(private actions$: Actions, private fsAboutService: FirestoreAboutService, private snackBar: MatSnackBar) {}

  @Effect()
  saveNickname: Observable<Action> = this.actions$.ofType<AboutActions.SaveNickname>(AboutActions.AboutActionTypes.SAVE_NICKNAME).pipe(
    map(action => action.payload),

    this.fsAboutService.saveNickname,

    map(data => {
      this.snackBar.open('Nickname saved.', null, {
        duration: 5000
      });
      return new AboutActions.SaveNicknameSuccess();
    }),

    catchError(err => {
      return of(new AboutActions.Error(err));
    })
  );

  @Effect()
  saveAttribute: Observable<Action> = this.actions$.ofType<AboutActions.SaveAttribute>(AboutActions.AboutActionTypes.SAVE_ATTRIBUTE).pipe(
    map(action => action.payload),

    this.fsAboutService.saveAttribute,

    map(data => {
      this.snackBar.open('Attribute saved.', null, {
        duration: 5000
      });
      return new AboutActions.SaveAttributeSuccess();
    }),

    catchError(err => {
      return of(new AboutActions.Error(err));
    })
  );

  @Effect()
  saveMemory: Observable<Action> = this.actions$.ofType<AboutActions.SaveMemory>(AboutActions.AboutActionTypes.SAVE_MEMORY).pipe(
    map(action => action.payload),

    this.fsAboutService.saveMemory,

    map(data => {
      this.snackBar.open('Memory saved.', null, {
        duration: 5000
      });
      return new AboutActions.SaveMemorySuccess();
    }),

    catchError(err => {
      return of(new AboutActions.Error(err));
    })
  );

  @Effect()
  error: Observable<Action> = this.actions$.ofType<AboutActions.Error>(AboutActions.AboutActionTypes.ERROR).pipe(
    map(action => {
      this.snackBar.open('Something went wrong - please refresh and try again', null, {
        duration: 20000
      });

      return { type: 'NO_ACTION' };
    })
  );
}
