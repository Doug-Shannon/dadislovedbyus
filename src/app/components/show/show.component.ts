declare var ConfettiGenerator: any;

import { Attribute } from './../../models/attribute';
import { AboutState } from 'app/state/reducers/about.reducer';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';
import { map, tap, withLatestFrom, switchMap, filter, delay } from 'rxjs/operators';
import { UserState } from 'app/state/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { User } from 'app/models/user';
import { bounceIn, bounceOut, zoomInLeft, zoomOutRight, fadeInLeft, fadeOutRight, fadeInDown, fadeOutUp, fadeOut } from 'ng-animate';
import 'confetti-js';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation
  // ...
} from '@angular/animations';
import { Nickname } from 'app/models/nickname';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
  animations: [
    trigger('zoomInOut', [
      transition(
        ':enter',
        useAnimation(fadeInDown, {
          // Set the duration to 5seconds and delay to 2seconds
          // params: { timing: 5, delay: 2 }
        })
      ),
      transition(
        ':leave',
        useAnimation(fadeOut, {
          // Set the duration to 5seconds and delay to 2seconds
          params: { timing: 0.55 }
        })
      )
    ]),
    trigger('bounceInUp', [
      transition(
        ':enter',
        useAnimation(bounceIn, {
          // Set the duration to 5seconds and delay to 2seconds
          // params: { timing: 5, delay: 2 }
        })
      ),
      transition(
        ':leave',
        useAnimation(bounceOut, {
          // Set the duration to 5seconds and delay to 2seconds
          params: { timing: 0.55 }
        })
      )
    ])
  ]
})
export class ShowComponent implements OnInit {
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

  constructor(private store: Store<UserState>, private renderer: Renderer2) {}

  private typewriter: any;
  public attributes: { user: User; attribute: Attribute; on: boolean }[] = [];
  public names: { name: string; on: boolean; size: string }[] = [{ name: 'Dave', on: true, size: '112px' }];
  public loaded = false;
  public confetti;

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
        tap(() => {
          this.loaded = true;
          this.confetti = new ConfettiGenerator(this.confSettings);
          this.confetti.render();
        }),
        tap(([usersState, aboutState]: [UserState, AboutState]) => {
          this.setupAttributes(aboutState.attributes, usersState.entities);
        }),
        tap(([usersState, aboutState]: [UserState, AboutState]) => {
          this.setupNicknames(aboutState.nicknames);
        })
      )
      .subscribe();
  }

  private setupAttributes(attributes: Attribute[], usersMap) {
    const attrMap = this.shuffle(
      attributes.map(a => {
        return { attribute: a, user: usersMap[a.user], on: false };
      })
    );
    if (attrMap[0]) {
      attrMap[0].on = true;
    }
    this.attributes = attrMap;

    interval(6000)
      .pipe(
        tap(() => {
          // Attributes
          this.attributes.forEach(a => {
            a.on = false;
          });
        }),
        delay(750),
        tap(() => {
          this.attributes[Math.floor(Math.random() * this.attributes.length)].on = true;

          // Names
        })
      )
      .subscribe();
  }

  private setupNicknames(nicknames: Nickname[]) {
    const dedupedArrayChecker: Nickname[] = [];
    const dedupedArray: Nickname[] = nicknames.filter(n => {
      if (!!dedupedArrayChecker.find(nick => n.nickname.toUpperCase() === nick.nickname.toUpperCase())) {
        return false;
      } else {
        dedupedArrayChecker.push(n);
        return true;
      }
    });
    const names = this.shuffle(dedupedArray.map(n => n.nickname));
    let curName = '';

    this.names = [
      ...this.names,
      ...names.map(n => {
        let size;
        if (n.length < 7) {
          size = '112px';
        } else if (n.length < 10) {
          size = '65px';
        } else if (n.length < 14) {
          size = '45px';
        } else if (n.length < 18) {
          size = '37px';
        } else {
          size = '30px';
        }

        return { name: n, size, on: false };
      })
    ];

    interval(10000)
      .pipe(
        tap(() => {
          // Attributes
          this.names.forEach(a => {
            a.on = false;
          });
        }),
        delay(750),
        map(val => {
          let idx;
          do {
            idx = Math.floor(Math.random() * names.length);
            console.log(name);
          } while (names.length > 1 && names[idx] === curName);
          curName = name;
          this.names.map(n => (n.on = false));
          this.names[idx].on = true;
        }),
        map((n: string) => {})
      )
      .subscribe();
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
