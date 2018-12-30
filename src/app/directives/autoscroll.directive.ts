import { Directive, Renderer2, ElementRef, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { scan, tap, takeWhile, switchMap } from 'rxjs/operators';

@Directive({
  selector: '[autoscroll]'
})
export class AutoscrollDirective implements OnChanges, OnInit, OnDestroy {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input() autoscroll: boolean;
  private sub: Subscription;

  ngOnChanges() {
    this.handleScroll();
  }
  ngOnInit() {
    this.handleScroll();
  }

  handleScroll() {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = interval(2000)
      .pipe(
        tap(() => this.renderer.setProperty(this.el.nativeElement, 'scrollTop', 0)),
        switchMap(() => interval(80)),
        takeWhile(val => this.autoscroll && val + this.el.nativeElement.clientHeight < this.el.nativeElement.scrollHeight),
        scan(acc => acc + 1, 0),
        tap(position => this.renderer.setProperty(this.el.nativeElement, 'scrollTop', position))
      )
      .subscribe();
  }

  ngOnDestroy() {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }
}
