import { Action } from '@ngrx/store';
import { User } from 'app/models/user';

export enum AuthActionTypes {
  GET_USER = '[Auth] Get user',
  AUTHENTICATED_REGISTERED = '[Auth] User authenticated and registered',
  AUTHENTICATED_NOT_REGISTERED = '[Auth] User authenticated and not registered',
  AUTHENTICATED = '[Auth] Authenticated',
  NOT_AUTHENTICATED = '[Auth] User not authenticated',
  GET_USER_DATA_SUCCESS = '[Auth] Get user data success',
  LOGIN = '[Auth] Login',
  LOGIN_FAILURE = '[Auth] Login failure',
  REGISTER = '[Auth] Register',
  REGISTER_FAILURE = '[Auth] Register failure',
  LOGOUT = '[Auth] Logout',
  AUTH_ERROR = '[Auth] Error',
  NOT_AUTHENTICATED_REDIRECT = '[Auth] Not authenticated redirect',
  REGISTERED = '[AUTH] Registered'
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
}

export class Authenticated implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED;

  constructor(public payload: string) {}
}

export class AuthenticatedRegistered implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED_REGISTERED;

  constructor(public payload: Partial<User>) {}
}

export class AuthenticatedNotRegistered implements Action {
  readonly type = AuthActionTypes.AUTHENTICATED_NOT_REGISTERED;

  constructor(public payload: string) {}
}

export class NotAuthenticated implements Action {
  readonly type = AuthActionTypes.NOT_AUTHENTICATED;
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: {firstname: string, lastname: string}) {}
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILURE;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;

  constructor(public payload: string) {}
}

export type AuthActions =
  | GetUser
  | AuthenticatedRegistered
  | NotAuthenticated
  | Authenticated
  | Login
  | LoginFailure
  | Logout
  | AuthenticatedNotRegistered
  | Register
  | RegisterFailure
  | AuthError;
