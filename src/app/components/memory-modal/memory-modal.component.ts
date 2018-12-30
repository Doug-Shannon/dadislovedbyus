import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MemoryModalData } from 'app/models/memory-dialog-data';
import { Memory } from 'app/models/memory';
import { Entry } from '../show/show.component';
import { trigger, transition, query, group, animate, style } from '@angular/animations';
import { interval } from 'rxjs';
import { takeWhile, tap } from 'rxjs/operators';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-memory-modal',
  templateUrl: './memory-modal.component.html',
  styleUrls: ['./memory-modal.component.scss'],
  animations: [
    trigger('pulse', [
      transition('* => *', [
        query(':self', [
          animate('.75s ease-in', style({ opacity: 0.75 })),
          animate('.75s 25ms ease-out', style({ opacity: 0.1 })),
          animate('.75s 25ms ease-in', style({ opacity: 0.75 })),
          animate('.75s 25ms ease-out', style({ opacity: 0.1 })),
          animate('.75s 25ms ease-in', style({ opacity: 0.75 })),
          animate('.75s 25ms ease-out', style({ opacity: 0 }))
        ])
      ])
    ])
  ]
})
export class MemoryModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MemoryModalComponent>, @Inject(MAT_DIALOG_DATA) public data: MemoryModalData) {}
  public swiped = false;
  public pulseSwipe = 'off';
  public pulseScroll = 'off';
  public slideIndex = 0;

  public options: { item: Entry<Memory>; selected: boolean }[] = [];
  config: any = {
    pagination: {
      el: '.swiper-pagination'
    },
    paginationClickable: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  ngOnInit() {
    this.options = this.data.memories.map(d => {
      return { item: d, selected: false };
    });
    this.options[0].selected = true;
    interval(7500).pipe(
      takeWhile(() => !this.swiped),
      tap(() => this.triggerAnimation())
    ).subscribe();
  }

  public onIndexChange(index: number): void {
    console.log(index);
    this.swiped = true;
  }

  triggerAnimation() {
    if (this.pulseSwipe === 'off') {
      this.pulseSwipe = 'on';
    } else {
      this.pulseSwipe = 'off';
    }
  }
}
