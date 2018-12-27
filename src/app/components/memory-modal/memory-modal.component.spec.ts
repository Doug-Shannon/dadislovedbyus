import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryModalComponent } from './memory-modal.component';

describe('MemoryModalComponent', () => {
  let component: MemoryModalComponent;
  let fixture: ComponentFixture<MemoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
