import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tell',
  templateUrl: './tell.component.html',
  styleUrls: ['./tell.component.css']
})
export class TellComponent implements OnInit {
  public instructions = [
    'Try to share a few different types of each (nicknames might be difficult)',
    'Make sure that they are up lifting and will bring him joy',
    'They can be funny but don\'t be mean',
    'Your name and face will be attached to these, again, don\'t be mean!',
    'Save each entry individually',
    'There is currently no undo button. If you save a mistake, text me and I will fix it.'
  ];

  constructor() { }

  ngOnInit() {
  }

}
