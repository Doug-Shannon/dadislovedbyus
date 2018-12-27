import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MemoryModalData } from 'app/models/memory-dialog-data';
import { Memory } from 'app/models/memory';
import { Entry } from '../show/show.component';

@Component({
  selector: 'app-memory-modal',
  templateUrl: './memory-modal.component.html',
  styleUrls: ['./memory-modal.component.scss']
})
export class MemoryModalComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MemoryModalComponent>, @Inject(MAT_DIALOG_DATA) public data: MemoryModalData) {}

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
  }
}
