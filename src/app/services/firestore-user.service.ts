import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { User } from 'app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FirestoreUserService {
  constructor(private fsDB: AngularFirestore, private store: Store<AppState>) {}

  public getUsers = this.fsDB
    .collection<User>('users')
    .valueChanges()
    .pipe(first());
}
