import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user';
import { Attribute } from 'app/models/attribute';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Input() content: Attribute;

  constructor() {}

  ngOnInit() {
  }
}
