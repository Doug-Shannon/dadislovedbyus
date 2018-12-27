import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user';

@Component({
  selector: 'app-user-circle',
  templateUrl: './user-circle.component.html',
  styleUrls: ['./user-circle.component.scss']
})
export class UserCircleComponent implements OnInit {
  @Input() user: User;
  public url: string;

  constructor() {}

  ngOnInit() {
    this.url = `https://lovedad.imgix.net/${this.user.faceUrl ? this.user.faceUrl : 'empty-profile.jpg'}?w=150&h=150`;
  }
}
