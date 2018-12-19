import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellComponent } from './tell.component';

describe('TellComponent', () => {
  let component: TellComponent;
  let fixture: ComponentFixture<TellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
