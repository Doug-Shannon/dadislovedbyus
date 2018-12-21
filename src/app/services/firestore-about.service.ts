import { Injectable, Attribute } from '@angular/core';

import { pipe, forkJoin } from 'rxjs';
import { concatMap, withLatestFrom, first, flatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { AuthState } from 'app/state/reducers/auth.reducer';
import { Nickname } from 'app/models/nickname';
import { Memory } from 'app/models/memory';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAboutService {
  constructor(private fsDB: AngularFirestore, private store: Store<AppState>) {}

  private getMemories = this.fsDB
    .collection<Memory>('memories')
    .valueChanges()
    .pipe(first());

  private getAttributes = this.fsDB
    .collection<Attribute>('attributes')
    .valueChanges()
    .pipe(first());

  private getNicknames = this.fsDB
    .collection<Nickname>('nicknames')
    .valueChanges()
    .pipe(first());

  public getAbout = forkJoin([this.getMemories, this.getAttributes, this.getNicknames]);

  public saveNickname = pipe(
    withLatestFrom(this.store.select('auth')),
    concatMap(([nickname, auth]: [string, AuthState]) => {
      return this.fsDB.collection('nicknames').add({ nickname, user: auth.user.uid });
    })
  );

  public saveAttribute = pipe(
    withLatestFrom(this.store.select('auth')),
    concatMap(([attribute, auth]: [string, AuthState]) => {
      return this.fsDB.collection('attributes').add({ attribute, user: auth.user.uid });
    })
  );

  public saveMemory = pipe(
    withLatestFrom(this.store.select('auth')),
    concatMap(([memory, auth]: [string, AuthState]) => {
      return this.fsDB.collection('memories').add({ memory, user: auth.user.uid });
    })
  );
}
