import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<img src="assets/loading.svg">'
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
