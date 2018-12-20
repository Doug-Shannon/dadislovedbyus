import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'app/../environments/environment';
import * as fromAuth from './auth.reducer';
import * as fromAbout from './about.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  about: fromAbout.AboutState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer,
  about: fromAbout.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
