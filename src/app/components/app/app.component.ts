import { AuthState } from './../../state/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from 'app/state/reducers';
import * as authActions from 'app/state/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public auth$: Observable<AuthState>;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.auth$ = this.store.select('auth');
    this.store.dispatch(new authActions.GetUser());
  }

  logout() {
    this.store.dispatch(new authActions.Logout());
  }
}
