import { Directive, Renderer2, ElementRef, OnInit, Input, OnChanges } from '@angular/core';
import { interval } from 'rxjs';
import { scan, tap, takeWhile } from 'rxjs/operators';

@Directive({
  selector: '[autoscroll]'
})
export class AutoscrollDirective implements OnChanges {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @Input() autoscroll: boolean;

  ngOnChanges() {
    // console.log('isBigger');

    console.log('autoscroll', this.autoscroll);
    if (this.el.nativeElement.clientHeight < this.el.nativeElement.scrollHeight && this.autoscroll) {
      interval(4)
        .pipe(
          scan((acc, curr) => acc + .05, 0),
          tap(position => this.renderer.setProperty(this.el.nativeElement, 'scrollTop', position)),
          takeWhile(val => this.autoscroll && val + this.el.nativeElement.clientHeight < this.el.nativeElement.scrollHeight)
        )
        .subscribe();
    } else {
      this.renderer.setProperty(this.el.nativeElement, 'scrollTop', 0);
    }
    console.log('in directive, el:', this.el);
  }
}
