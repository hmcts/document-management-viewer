import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[viewer-anchor]',
})
export class ViewerAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
