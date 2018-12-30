import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from 'app/state/reducers';
import { Store } from '@ngrx/store';
import * as aboutActions from 'app/state/actions/about.actions';
import * as authActions from 'app/state/actions/auth.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AboutState } from 'app/state/reducers/about.reducer';
import { Observable } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-tell',
  templateUrl: './tell.component.html',
  styleUrls: ['./tell.component.css']
})
export class TellComponent implements OnInit {

  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public instructions = [
    { icon: 'scatter_plot', text: 'Try to share a few different types of each (nicknames might be difficult)' },
    {
      icon: 'sentiment_very_satisfied',
      text: 'Your name and face will be attached to these, make sure that they are up-lifting and will bring him joy'
    },
    { icon: 'done', text: 'Save each entry individually' },
    { icon: 'error', text: 'There is currently no undo button. If you save a mistake, text me and I will fix it.' },
    { icon: 'face', text: 'Nicknames are just the names you might call him by.  I\'ll display them in a fun way' },
    { icon: 'fingerprint', text: 'Attributes are an explanation of his character.  Think of them as 1-2 word amazon reviews.' },
    { icon: 'favorite', text: 'Memories are meant to be long form - type as much as you want.' }
  ];
  public nicknameForm = new FormGroup({ nickname: new FormControl('', [Validators.required, Validators.maxLength(20)]) });
  public attributeForm = new FormGroup({ attribute: new FormControl('', [Validators.required, Validators.maxLength(50)]) });
  public memoryForm = new FormGroup({ memory: new FormControl('', [Validators.required, Validators.maxLength(1000)]) });
  public about$: Observable<AboutState>;
  ngZone: any;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.about$ = this.store.select('about').pipe(
      tap((about: AboutState) => {
        if (!about.saving && !about.loading && !about.error) {
          this.nicknameForm.reset();
          this.attributeForm.reset();
          this.memoryForm.reset();
        } else if (about.error) {
          console.error('error', about.error);
        }
      })
    );
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
  logout() {
      this.store.dispatch(new authActions.Logout());
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
