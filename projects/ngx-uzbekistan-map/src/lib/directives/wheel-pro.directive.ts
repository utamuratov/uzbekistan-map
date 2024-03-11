import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[emWheelPro]',
  standalone: true,
})
export class WheelProDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mousewheel', ['$event']) onMousewheel(event: any) {
    // KILL SCROLLING
    event.preventDefault();

    const svg = this.el.nativeElement.children[0];
    let scale = +(svg.style.getPropertyValue('scale') || '1');

    const plusMinus = event.wheelDelta > 0 ? 1 : -1;
    const step = scale > 2 ? Math.ceil(scale / 10) : 0.2;

    scale += plusMinus * step;
    if (scale < 0.6) {
      return;
    }
    svg.style.setProperty('scale', `${scale}`, 'important');
  }
}
