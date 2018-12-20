import { Injectable } from '@angular/core';

import { pipe } from 'rxjs';
import { concatMap, withLatestFrom } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { AuthState } from 'app/state/reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAboutService {
  constructor(private fsDB: AngularFirestore, private store: Store<AppState>) {}

  public saveNickname = pipe(
    withLatestFrom(this.store.select('auth')),
    concatMap(([nickname, auth]: [string, AuthState]) => {
      return this.fsDB.collection('nicknames').add({ nickname, user: auth.user.uid });
    })
  );

  public saveAttribute = pipe(
    withLatestFrom(this.store.select('auth')),
    concatMap(([attribute, auth]: [string, AuthState]) => {
      return this.fsDB.collection('attributes').add({ attribute, user: auth.user.uid  });
    })
  );

  public saveMemory = pipe(
    withLatestFrom(this.store.select('auth')),
    concatMap(([memory, auth]: [string, AuthState]) => {
      return this.fsDB.collection('memories').add({ memory, user: auth.user.uid  });
    })
  );
}
