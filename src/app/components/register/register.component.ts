import { Router } from '@angular/router';
import { AuthState } from 'app/state/reducers/auth.reducer';
import { User } from 'app/models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import * as authActions from 'app/state/actions/auth.actions';
import { first, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public userForm: FormGroup;
  private storeSub: Subscription;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required)
    });

    this.storeSub = this.store
      .select('auth')
      .pipe(filter(state => !state.loading && state.loggedIn && state.registered))
      .subscribe(state => {
        if (state.registered) {
          this.router.navigate(['tell']);
        }
      });
  }

  public onSubmit() {
    const { firstname, lastname } = this.userForm.value;
    this.store.dispatch(new authActions.Register({ firstname, lastname }));
  }

  public cancel() {
    this.store.dispatch(new authActions.Logout());
  }

  public ngOnDestroy() {
    this.storeSub.unsubscribe();
  }
}
