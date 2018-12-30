import { AuthState } from './../../state/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnChanges } from '@angular/core';
import { AppState } from 'app/state/reducers';
import * as authActions from 'app/state/actions/auth.actions';
import * as aboutActions from 'app/state/actions/about.actions';
import * as userActions from 'app/state/actions/user.actions';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { tap } from 'rxjs/operators';
declare var ConfettiGenerator: any;

import 'confetti-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router, private breakpointObserver: BreakpointObserver) {}
  public isBigScreenObs;
  confSettings = {
    target: 'confetti-holder',
    max: '120',
    size: '1',
    animate: true,
    props: ['circle', 'square', 'triangle'],
    colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
    clock: '15',
    rotate: true,
    width: '',
    height: ''
  };
  public confetti;
  public attentionSeeker = '';

  ngOnInit() {
    this.confetti = new ConfettiGenerator(this.confSettings);
    this.confetti.render();
    this.store.dispatch(new authActions.GetUser());
    this.store.dispatch(new aboutActions.GetAbout());
    this.store.dispatch(new userActions.GetUsers());

    this.isBigScreenObs = this.breakpointObserver.observe('(min-width: 500px)').pipe(tap(x => console.log(x)));
  }
}
