import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[content]'
})
export class ContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
