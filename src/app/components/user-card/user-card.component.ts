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
  public faceUrl: string;

  constructor() { }

  ngOnInit() {
    this.faceUrl = `https://lovedad.imgix.net/${this.user.faceUrl ? this.user.faceUrl : 'dad-face.png'}?w=150&h=150`;
  }
}
