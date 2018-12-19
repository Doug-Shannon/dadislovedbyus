import { AuthState } from './../../state/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AppState } from 'app/state/reducers';
import * as authActions from 'app/state/actions/auth.actions';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public auth$: Observable<AuthState>;
  public isLogin = false;
  public isTell = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.auth$ = this.store.select('auth');
    this.store.dispatch(new authActions.GetUser());
  }

  logout() {
    this.store.dispatch(new authActions.Logout());
  }

  login() {
    this.router.navigate(['login']);
  }

  tell() {
    this.router.navigate(['tell']);
  }
}
