import { Component, OnInit } from '@angular/core';
import * as typer from 'typer-js';
import { Observable, interval } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  constructor() {}

  private typewriter: any;
  private names: string[] = ['Dave', 'Dad', 'David', 'Pops', 'Pa'];
  private curName: string = this.names[0];

  ngOnInit() {
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
