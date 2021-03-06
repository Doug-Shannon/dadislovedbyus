import { ActionReducer, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from 'app/../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromAbout from './about.reducer';
import * as fromUser from './user.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  about: fromAbout.AboutState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  about: fromAbout.reducer,
  user: fromUser.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];


export const selectUserState = createFeatureSelector<fromUser.UserState>('user');

export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAllUsers
);
