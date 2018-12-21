import { Attribute } from './../../models/attribute';
import { AboutState } from 'app/state/reducers/about.reducer';
import { Component, OnInit } from '@angular/core';
import * as typer from 'typer-js';
import { Observable, interval } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { UserState } from 'app/state/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { selectAllUsers } from 'app/state/reducers';
import { User } from 'app/models/user';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  constructor(private store: Store<UserState>) {}

  private typewriter: any;
  private names: string[] = ['Dave', 'Dad', 'David', 'Pops', 'Pa'];
  private curName: string = this.names[0];
  public attributes$: Observable<{user: User, attribute: Attribute}[]>;

  ngOnInit() {
    this.attributes$ = this.store.select('user').pipe(
      withLatestFrom(this.store.select('about')),
      map(([usersState, aboutState]: ([UserState, AboutState])) => {
        console.log(usersState)
        return aboutState.attributes.map(a => {
          return {attribute: a, user: usersState.entities[a.user]};
        });
      }),
      tap(attr => console.log(attr))
    );
    this.typewriter = typer('#typer', { min: 200, max: 350 })
      .cursor({block: false, blink: 'hard', color: 'grey'})
      .line(this.curName)
      .pause(3000);
    // this.typewriter.line('this.curName');

    interval(2000)
      .pipe(
        map(val => {
          return this.names[Math.floor(Math.random() * this.names.length)];
        }),
        map(name => {
          console.log(name);
          this.typewriter.back('all', 150).continue(name).pause('2000');
          this.curName = name;
        })
      )
      .subscribe();
  }

  setupTyper() {
    setTimeout(() => {
      this.typewriter.line();
    }, 3000);
  }
}
