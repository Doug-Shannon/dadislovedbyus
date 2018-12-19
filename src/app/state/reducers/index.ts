import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'app/../environments/environment';
import * as fromAuth from './auth.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
