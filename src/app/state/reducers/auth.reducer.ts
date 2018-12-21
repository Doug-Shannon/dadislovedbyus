import { AuthActions, AuthActionTypes } from 'app/state/actions/auth.actions';
import { User } from 'app/models/user';
import { produce } from 'immer';

export interface AuthState {
  user: User;
  error?: string;
  loading: boolean;
  registered: boolean;
  loggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  registered: false,
  loggedIn: false
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.GET_USER:
    case AuthActionTypes.LOGIN:
      return produce(state, draft => {
        draft.loading = true;
      });
    case AuthActionTypes.REGISTER:
      return produce(state, draft => {
        draft.user.firstname = action.payload.firstname;
        draft.user.lastname = action.payload.lastname;
        draft.loading = true;
      });
    case AuthActionTypes.REGISTER_FAILURE:
      return produce(state, draft => {
        draft.loading = false;
      });
    case AuthActionTypes.AUTHENTICATED:
      return produce(state, draft => {
        draft.user = User.From({ id: action.payload });
      });
    case AuthActionTypes.AUTHENTICATED_REGISTERED:
      return produce(state, draft => {
        draft.user = User.From({ ...draft.user, ...action.payload });
        draft.loggedIn = true;
        draft.registered = true;
        draft.loading = false;
      });
    case AuthActionTypes.AUTHENTICATED_NOT_REGISTERED:
      return produce(state, draft => {
        draft.user = User.From({ id: action.payload });
        draft.loggedIn = true;
        draft.registered = false;
        draft.loading = false;
      });
    case AuthActionTypes.NOT_AUTHENTICATED:
    case AuthActionTypes.LOGOUT:
      return produce(state, draft => {
        draft.user = null;
        draft.loggedIn = false;
        draft.registered = false;
        draft.loading = false;
      });
    case AuthActionTypes.AUTH_ERROR:
      return produce(state, draft => {
        draft.error = action.payload;
        draft.loading = false;
      });
    default:
      return state;
  }
}
