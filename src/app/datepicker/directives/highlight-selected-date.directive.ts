import { Directive, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';
import { Day } from '../classes/day.class';

@Directive({
  selector: '[appHighlightSelectedDate]'
})
export class HighlightSelectedDateDirective implements OnChanges {
  @Input() thisDay: Day;
  @Input() selectedDay: Day;

  constructor(private elemRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges() {
    if (
      (this.thisDay.dayYear === this.selectedDay.dayYear) &&
      (this.thisDay.dayMonth === this.selectedDay.dayMonth) &&
      (this.thisDay.dayDate === this.selectedDay.dayDate)
    ) {
      this.renderer.addClass(this.elemRef.nativeElement, 'selected-date');
    } else {
      this.renderer.removeClass(this.elemRef.nativeElement, 'selected-date');
    }
  }

}
