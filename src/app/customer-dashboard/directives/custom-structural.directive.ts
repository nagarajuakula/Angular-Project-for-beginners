import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class CustomStructuralDirective {
  @Input() set appUnless(condition: boolean) {
    if (condition) {
      this.vc.createEmbeddedView(this.templateRef);
    } else {
      this.vc.clear();
    }
  }
  constructor(private templateRef: TemplateRef<any>, private vc: ViewContainerRef) { }

}
