import { Memory } from 'app/models/memory';
import { Action } from '@ngrx/store';
import { Nickname } from 'app/models/nickname';
import { Attribute } from '@angular/compiler/src/core';

export enum AboutActionTypes {
  GET_ABOUT = '[INIT] Get about',
  GET_ABOUT_SUCCESS = '[FIRESTORE] Get about success',
  SAVE_NICKNAME = '[TELL] Save nickname',
  SAVE_NICKNAME_SUCCESS = '[FIRESTORE] Save nickname success',
  SAVE_ATTRIBUTE = '[TELL] Save attribute',
  SAVE_ATTRIBUTE_SUCCESS = '[FIRESTORE] Save attribute success',
  SAVE_MEMORY = '[TELL] Save memory',
  SAVE_MEMORY_SUCCESS = '[FIRESTORE] Save memory success',
  ERROR = '[FIRESTORE] Error'
}
export class GetAbout implements Action {
  readonly type = AboutActionTypes.GET_ABOUT;
}

export class GetAboutSuccess implements Action {
  readonly type = AboutActionTypes.GET_ABOUT_SUCCESS;

  constructor(public payload: {nicknames: Nickname[], attributes: Attribute[], memories: Memory[]}) {}
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
  GetAbout
  | GetAboutSuccess
  | SaveNickname
  | SaveNicknameSuccess
  | Error
  | SaveAttribute
  | SaveAttributeSuccess
  | SaveMemory
  | SaveMemorySuccess;
