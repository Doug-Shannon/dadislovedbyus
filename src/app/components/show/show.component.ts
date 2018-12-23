import { Attribute } from './../../models/attribute';
import { AboutState } from 'app/state/reducers/about.reducer';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import * as typer from 'typer-js';
import { Observable, interval, pipe } from 'rxjs';
import { map, tap, withLatestFrom, switchMap, filter } from 'rxjs/operators';
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
import { Nickname } from 'app/models/nickname';

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
  constructor(private store: Store<UserState>, private renderer: Renderer2) {}

  private typewriter: any;
  public attributes: { user: User; attribute: Attribute; on: boolean }[] = [];
  public loaded = false;

  @ViewChild('typer') private typerEl: ElementRef;

  ngOnInit() {
    this.store
      .select('user')
      .pipe(
        withLatestFrom(this.store.select('about')),
        filter(([usersState, aboutState]: [UserState, AboutState]) => {
          console.log('in filter', !(aboutState.loading || usersState.loading));
          return !(aboutState.loading || usersState.loading);
        }),
        tap(() => (this.loaded = true)),
        tap(([usersState, aboutState]: [UserState, AboutState]) => {
          this.setupAttributes(aboutState.attributes, usersState.entities);
        }),
        tap(([usersState, aboutState]: [UserState, AboutState]) => {
          this.setupNicknames(aboutState.nicknames);
        })
      )
      .subscribe();
  }

  private setupAttributes(attributes, usersMap) {
    const attrMap = this.shuffle(
      attributes.map(a => {
        return { attribute: a, user: usersMap[a.user], on: false };
      })
    );
    if (attrMap[0]) {
      attrMap[0].on = true;
    }
    this.attributes = attrMap;

    interval(5000)
      .pipe(
        tap(() => {
          // Attributes
          this.attributes.forEach(a => {
            a.on = false;
          });
          this.attributes[Math.floor(Math.random() * this.attributes.length)].on = true;

          // Names
        })
      )
      .subscribe();
  }

  private setupNicknames(nicknames: Nickname[]) {
    const names = nicknames.map(n => n.nickname);
    let curName = '';

    interval(3500)
      .pipe(
        map(val => {
          let name;
          do {
            name = names[Math.floor(Math.random() * names.length)];
            console.log(name);
          } while (names.length > 1 && name === curName);
          curName = name;
          console.log(this.typerEl);
          if (curName.length < 6) {
            this.renderer.setStyle(this.typerEl.nativeElement, 'font-size', '112px');
          } else if (curName.length < 13) {
            this.renderer.setStyle(this.typerEl.nativeElement, 'font-size', '65px');
          } else {
            this.renderer.setStyle(this.typerEl.nativeElement, 'font-size', '35px');
          }
          return name;
        }),
        map((n: string) => {
          console.log('n', n);
          this.typewriter
            .back('all', 150)
            .continue(n)
            // .pause('2000');
        })
      )
      .subscribe();

    this.typewriter = typer('#typer', { min: 200, max: 350 })
      .cursor(false)
      .line('Dave')
      .pause(3000);
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
