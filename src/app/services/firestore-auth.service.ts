import { User } from 'app/models/user';
import { Injectable } from '@angular/core';

import { pipe, from as ObservableFrom } from 'rxjs';
import { switchMap, map, withLatestFrom, tap, concatMap, filter } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirestoreAuthService {
  constructor(private fsDB: AngularFirestore, private store: Store<AppState>, private fAuth: AngularFireAuth) {}

  public getRegisteredUser = pipe(
    concatMap((id: string) => {
      return this.fsDB
        .collection('users')
        .doc(id)
        .snapshotChanges()
        .pipe(map(action => (action.payload.exists ? User.From({ ...action.payload.data(), id: action.payload.id }) : id)));
    })
  );

  public getAuthStatus = concatMap(() => this.fAuth.authState);

  public signOut = concatMap(() => ObservableFrom(this.fAuth.auth.signOut()));

  public signIn = concatMap(() => this.googleLogin());

  public registerUser() {
    return this.store.select('auth').pipe(
      map(a => a.user),
      switchMap(user => {
        return this.fsDB
          .collection('users')
          .doc(user.id)
          .set({firstname: user.firstname, lastname: user.lastname});
      })
    );
  }

  private googleLogin() {
    return ObservableFrom(this.fAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }
}
