import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-circle',
  templateUrl: './user-circle.component.html',
  styleUrls: ['./user-circle.component.scss']
})
export class UserCircleComponent implements OnInit {
  @Input() imgUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
