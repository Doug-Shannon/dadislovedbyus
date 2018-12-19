import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'app/state/reducers';
import { Store } from '@ngrx/store';
import * as authActions from 'app/state/actions/auth.actions';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private storeSub: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.storeSub = this.store
      .select('auth')
      .pipe(filter(state => !state.loading && state.loggedIn))
      .subscribe(state => {
        if (state.registered) {
          console.log('registered');
          this.router.navigate(['tell']);
        } else {
          console.log('not registered');
          this.router.navigate(['register']);
        }
      });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  login() {
    this.store.dispatch(new authActions.Login());
  }
}
