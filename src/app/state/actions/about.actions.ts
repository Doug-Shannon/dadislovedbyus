import { Action } from '@ngrx/store';

export enum AboutActionTypes {
  SAVE_NICKNAME = '[TELL] Save nickname',
  SAVE_NICKNAME_SUCCESS = '[FIRESTORE] Save nickname success',
  SAVE_ATTRIBUTE = '[TELL] Save attribute',
  SAVE_ATTRIBUTE_SUCCESS = '[FIRESTORE] Save attribute success',
  SAVE_MEMORY = '[TELL] Save memory',
  SAVE_MEMORY_SUCCESS = '[FIRESTORE] Save memory success',
  ERROR = '[FIRESTORE] Error'
}

export class SaveNickname implements Action {
  readonly type = AboutActionTypes.SAVE_NICKNAME;

  constructor(public payload: string) {}
}

export class SaveNicknameSuccess implements Action {
  readonly type = AboutActionTypes.SAVE_NICKNAME_SUCCESS;

  constructor() {}
}

export class SaveAttribute implements Action {
  readonly type = AboutActionTypes.SAVE_ATTRIBUTE;

  constructor(public payload: string) {}
}

export class SaveMemorySuccess implements Action {
  readonly type = AboutActionTypes.SAVE_MEMORY_SUCCESS;

  constructor() {}
}

export class SaveMemory implements Action {
  readonly type = AboutActionTypes.SAVE_MEMORY;

  constructor(public payload: string) {}
}

export class SaveAttributeSuccess implements Action {
  readonly type = AboutActionTypes.SAVE_ATTRIBUTE_SUCCESS;

  constructor() {}
}

export class Error implements Action {
  readonly type = AboutActionTypes.ERROR;

  constructor(public payload: string) {}
}

export type AboutActions =
  | SaveNickname
  | SaveNicknameSuccess
  | Error
  | SaveAttribute
  | SaveAttributeSuccess
  | SaveMemory
  | SaveMemorySuccess;
