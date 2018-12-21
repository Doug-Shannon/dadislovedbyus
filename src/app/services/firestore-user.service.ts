import { Injectable } from '@angular/core';

import { first, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService {
  constructor(private fsDB: AngularFirestore) {}

  public getUsers = this.fsDB
    .collection<User>('users')
    .snapshotChanges()
    .pipe(
      first(),
      map(actions => actions.map(action => User.From({ ...action.payload.doc.data(), id: action.payload.doc.id })))
    );
}
