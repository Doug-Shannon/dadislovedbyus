import { Memory } from 'app/models/memory';
import { AboutActions, AboutActionTypes } from 'app/state/actions/about.actions';
import { produce } from 'immer';
import { Nickname } from 'app/models/nickname';
import { Attribute } from '@angular/compiler/src/core';

export interface AboutState {
  nicknames: Nickname[];
  attributes: Attribute[];
  memories: Memory[];
  saving: boolean;
  loading: boolean;
  error: string;
}

const initialState: AboutState = {
  nicknames: [],
  attributes: [],
  memories: [],
  saving: false,
  loading: false,
  error: null
};

export function reducer(state = initialState, action: AboutActions): AboutState {
  switch (action.type) {
    case AboutActionTypes.GET_ABOUT:
      return produce(state, draft => {
        draft.loading = true;
      });
      case AboutActionTypes.GET_ABOUT_SUCCESS:
        return produce(state, draft => {
          draft.nicknames = action.payload.nicknames;
          draft.attributes = action.payload.attributes;
          draft.memories = action.payload.memories;
          draft.loading = false;
        });
    case AboutActionTypes.SAVE_NICKNAME:
    case AboutActionTypes.SAVE_ATTRIBUTE:
    case AboutActionTypes.SAVE_MEMORY:
      return produce(state, draft => {
        draft.saving = true;
      });
    case AboutActionTypes.SAVE_ATTRIBUTE_SUCCESS:
    case AboutActionTypes.SAVE_NICKNAME_SUCCESS:
    case AboutActionTypes.SAVE_MEMORY_SUCCESS:
      return produce(state, draft => {
        draft.saving = false;
      });
    case AboutActionTypes.ERROR:
      return produce(state, draft => {
        draft.error = action.payload;
        draft.loading = false;
        draft.saving = false;
      });
    default:
      return state;
  }
}
