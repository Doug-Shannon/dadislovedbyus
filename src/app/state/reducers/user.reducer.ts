import { UserActions, UserActionTypes } from 'app/state/actions/user.actions';
import { produce } from 'immer';
import { User } from 'app/models/user';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

const userAdapter = createEntityAdapter<User>();

export interface UserState extends EntityState<User> {
  loading: boolean;
  error: string;
}

const initialState: UserState = userAdapter.getInitialState({ loading: false, error: null });

export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.GET_USERS:
      return produce(state, draft => {
        draft.loading = true;
      });
    case UserActionTypes.GET_USERS_SUCCESS:
      return userAdapter.addAll(action.payload, { ...state, loading: false });
    case UserActionTypes.ERROR:
      return produce(state, draft => {
        draft.loading = false;
        draft.error = action.payload;
      });
    default:
      return state;
  }
}
