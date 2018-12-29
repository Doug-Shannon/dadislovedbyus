import { MemoryModalData } from 'app/models/memory-dialog-data';
import { Memory } from './../../models/memory';
import { MemoryModalComponent } from './../memory-modal/memory-modal.component';
declare var ConfettiGenerator: any;

import { Attribute } from './../../models/attribute';
import { AboutState } from 'app/state/reducers/about.reducer';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { interval } from 'rxjs';
import { map, tap, withLatestFrom, switchMap, filter, delay } from 'rxjs/operators';
import { UserState } from 'app/state/reducers/user.reducer';
import { Store } from '@ngrx/store';
import { User } from 'app/models/user';
import { bounceIn, bounceOut, rubberBand, fadeInDown, fadeOut, jello, fadeIn } from 'ng-animate';
import 'confetti-js';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
  query,
  stagger,
  animateChild,
  group
  // ...
} from '@angular/animations';
import { Nickname } from 'app/models/nickname';
import produce from 'immer';
import { MatDialog } from '@angular/material';

export interface Entry<T> {
  on: boolean;
  used: boolean;
  size?: string;
  user?: User;
  entry: T;
}

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
    ]),
    trigger('seekAttention', [
      transition('* => *', [
        query(':self', [
          group([
            useAnimation(rubberBand, { params: { timing: 1, delay: 0.5 } }),
            query('#heart-text', [animate('.75s ease-in', style({ opacity: 0.25 })), animate('.75s 500ms ease-out', style({ opacity: 0 }))])
          ])
        ])
      ])
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

  constructor(private store: Store<UserState>, private renderer: Renderer2, private dialog: MatDialog) {}

  public attributes: Entry<Attribute>[] = [];
  public memories: Entry<Memory>[] = [];
  public names: Entry<string>[] = [{ entry: 'Dave', on: true, size: '112px', used: false } as Entry<string>];
  public loaded = false;
  public confetti;
  public attentionSeeker = '';

  @ViewChild('typer') private typerEl: ElementRef;

  ngOnInit() {
    this.store
      .select('user')
      .pipe(
        withLatestFrom(this.store.select('about')),
        filter(([usersState, aboutState]: [UserState, AboutState]) => {
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
        }),
        tap(([usersState, aboutState]: [UserState, AboutState]) => {
          this.setupMemories(aboutState.memories, usersState.entities);
        }),
        tap(() => {
          this.setupMemoryButton();
        })
      )
      .subscribe();
  }

  public memoryButtonClicked() {
    const dialogRef = this.dialog.open(MemoryModalComponent, {
      data: { memories: this.memories } as MemoryModalData,
      panelClass: 'panelClass',
      height: '80%',
      width: '800px',
      backdropClass: 'backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private setupMemories(memories: Memory[], usersMap) {
    const mems = this.shuffle(
      memories.map(m => {
        return { entry: m, user: usersMap[m.user], on: false, used: false } as Entry<Memory>;
      })
    );
    this.memories = mems;
  }

  private setupAttributes(attributes: Attribute[], usersMap) {
    const dedupedArrayChecker: Attribute[] = [];
    const dedupedArray: Attribute[] = attributes.filter(a => {
      if (
        !!dedupedArrayChecker.find(attr => {
          return a.attribute === attr.attribute && a.user === attr.user;
        })
      ) {
        return false;
      } else {
        dedupedArrayChecker.push(a);
        return true;
      }
    });
    const attrMap = this.shuffle(
      dedupedArray.map(a => {
        return { entry: a, user: usersMap[a.user], on: false, used: false } as Entry<Attribute>;
      })
    );
    if (attrMap[0]) {
      attrMap[0].on = true;
    }
    this.attributes = attrMap;

    interval(6000)
      .pipe(
        tap(() => {
          this.attributes.forEach(a => (a.on = false));
        }),
        map(() => this.attributes.filter(a => !a.used).length <= 1),
        delay(750),
        map(reset => {
          const remaining = this.attributes.filter(a => a.used === false);

          const remainingIndex = Math.floor(Math.random() * remaining.length);
          const randomRemaining = remaining[remainingIndex].entry;
          const index = this.attributes.findIndex(({ entry }) => {
            return entry.attribute === randomRemaining.attribute && entry.user === randomRemaining.user;
          });

          return {
            index,
            reset
          };
        })
      )
      .subscribe(({ index, reset }) => {
        if (reset) {
          this.attributes.forEach(a => {
            a.used = false;
          });
        }
        this.attributes[index].on = true;
        this.attributes[index].used = true;
      });
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
    this.names = this.shuffle(dedupedArray.map(n => n.nickname)).map(n => {
      let size;
      if (n.length < 7) {
        size = '112px';
      } else if (n.length < 10) {
        size = '65px';
      } else if (n.length < 14) {
        size = '55px';
      } else if (n.length < 18) {
        size = '37px';
      } else {
        size = '30px';
      }

      return { entry: n, size, on: false, used: false };
    });
    this.names[0].on = true;

    interval(10000)
      .pipe(
        tap(() => {
          this.names.forEach(n => (n.on = false));
        }),
        map(() => {
          return {
            names: produce(this.names, draft => {}),
            reset: this.names.filter(n => !n.used).length <= 1
          };
        }),
        delay(750),
        map(({ names, reset }) => {
          const remaining = names.filter(n => n.used === false).length;
          const index = Math.floor(Math.random() * remaining);
          return { index, reset };
        })
      )
      .subscribe(({ index, reset }) => {
        if (reset) {
          this.names.forEach(n => {
            n.used = false;
          });
        }
        this.names[index].on = true;
        this.names[index].used = true;
      });
  }

  private setupMemoryButton() {
    this.attentionSeeker = 'a';
    interval(15000)
      .pipe(
        tap(() => {
          if (this.attentionSeeker === 'a') {
            this.attentionSeeker = 'b';
          } else {
            this.attentionSeeker = 'a';
          }
        })
      )
      .subscribe();
  }

  private shuffle<T>(array: T[]): T[] {
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
