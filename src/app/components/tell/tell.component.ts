import { Component, OnInit } from '@angular/core';
import { AppState } from 'app/state/reducers';
import { Store } from '@ngrx/store';
import * as aboutActions from 'app/state/actions/about.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AboutState } from 'app/state/reducers/about.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tell',
  templateUrl: './tell.component.html',
  styleUrls: ['./tell.component.css']
})
export class TellComponent implements OnInit {
  public instructions = [
    { icon: 'scatter_plot', text: 'Try to share a few different types of each (nicknames might be difficult)' },
    {
      icon: 'sentiment_very_satisfied',
      text: 'Your name and face will be attached to these, make sure that they are up-lifting and will bring him joy'
    },
    { icon: 'done', text: 'Save each entry individually' },
    { icon: 'error', text: 'There is currently no undo button. If you save a mistake, text me and I will fix it.' }
  ];
  public nicknameForm = new FormGroup({ nickname: new FormControl('', [Validators.required, Validators.maxLength(10)]) });
  public attributeForm = new FormGroup({ attribute: new FormControl('', [Validators.required, Validators.maxLength(25)]) });
  public memoryForm = new FormGroup({ memory: new FormControl('', [Validators.required, Validators.maxLength(500)]) });
  public about$: Observable<AboutState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.about$ = this.store.select('about');
  }

  saveNickname() {
    if (this.nicknameForm.valid) {
      this.store.dispatch(new aboutActions.SaveNickname(this.nicknameForm.value.nickname));
    }
  }
  saveAttribute() {
    if (this.attributeForm.valid) {
      this.store.dispatch(new aboutActions.SaveAttribute(this.attributeForm.value.attribute));
    }
  }
  saveMemory() {
    if (this.memoryForm.valid) {
      this.store.dispatch(new aboutActions.SaveMemory(this.memoryForm.value.memory));
    }
  }
}
