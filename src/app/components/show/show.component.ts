import { Attribute } from './../../models/attribute';
import { AboutState } from 'app/state/reducers/about.reducer';
import { Component, OnInit } from '@angular/core';
import * as typer from 'typer-js';
import { Observable, interval } from 'rxjs';
import { map, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { UserState } from 'app/state/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { selectAllUsers } from 'app/state/reducers';
import { User } from 'app/models/user';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  group
  // ...
} from '@angular/animations';
import produce from 'immer';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  animations: [
    trigger('thumbState', [
      state(
        'inactive',
        style({
          opacity: 0,
          transform: 'scale(0.5)'
        })
      ),
      state(
        'active',
        style({
          opacity: 1,
          transform: 'scale(1)'
        })
      ),
      // cubic-bezier from http://easings.net/
      transition('inactive => active', animate('500ms cubic-bezier(0.785, 0.135, 0.15, 0.86)')),
      transition('active => inactive', animate('500ms cubic-bezier(0.785, 0.135, 0.15, 0.86)'))
    ]),
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('1s ease-in')
      ]),
      transition(':leave', [
        animate(
          '.2s .1s ease-out',
          style({
            opacity: 0,
            transform: 'translateX(100%)'
          })
        )
      ])
    ])
  ]
})
export class ShowComponent implements OnInit {
  constructor(private store: Store<UserState>) {}

  private typewriter: any;
  private names: string[] = ['Dave', 'Dad', 'David', 'Pops', 'Pa'];
  private curName: string = this.names[0];
  public attributes: { user: User; attribute: Attribute; on: boolean }[] = [];

  ngOnInit() {
    this.store
      .select('user')
      .pipe(
        withLatestFrom(this.store.select('about')),
        map(([usersState, aboutState]: [UserState, AboutState]) => {
          return aboutState.attributes.map(a => {
            return { attribute: a, user: usersState.entities[a.user], on: false };
          });
        }),
        tap(stuff => {
          stuff = this.shuffle(stuff);
          if (stuff[0]) {
            stuff[0].on = true;
          }
          this.attributes = stuff;
        }),
        switchMap(stuff => {
          return interval(5000).pipe(
            map(() => {
              this.attributes.forEach(a => {
                a.on = false;
              });
              this.attributes[Math.floor(Math.random() * this.attributes.length)].on = true;
            })
          );
        })
      )
      .subscribe();
    this.typewriter = typer('#typer', { min: 200, max: 350 })
      .cursor({ block: false, blink: 'hard', color: 'grey' })
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
          this.typewriter
            .back('all', 150)
            .continue(name)
            .pause('2000');
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

  private shuffle(array) {
    let m = array.length,
      t,
      i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }
}
