import { Action } from '@ngrx/store';
import { User } from 'app/models/user';

export enum UserActionTypes {
  GET_USERS = '[INIT] Get users',
  GET_USERS_SUCCESS = '[FIRESTORE] Get users success',
  ERROR = '[FIRESTORE] Error'
}
export class GetUsers implements Action {
  readonly type = UserActionTypes.GET_USERS;
}

export class GetUserSuccess implements Action {
  readonly type = UserActionTypes.GET_USERS_SUCCESS;

  constructor(public payload:  User[] ) {}
}
export class Error implements Action {
  readonly type = UserActionTypes.ERROR;

  constructor(public payload: string) {}
}

export type UserActions = GetUsers | GetUserSuccess | Error;
