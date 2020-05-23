import { Directive, OnInit, HostListener,
ElementRef, Renderer2, HostBinding, Input} from '@angular/core';

@Directive({
    selector: '[appHighlight]'
})
export class CustomDirective implements OnInit {
    @HostBinding('style.color') textColor;
    @Input() defaultColor: string = 'black';
    @Input() highlightColor: string;
    ngOnInit() {
        //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultColor);
    }

    constructor(private elementRef: ElementRef,
        private renderer: Renderer2) {}

    @HostListener('mouseenter') mouseEnter(event: Event) {
        //this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'red');
        this.textColor = this.highlightColor ? this.highlightColor : this.defaultColor;
    }

    @HostListener('mouseleave') mouseOut(event: Event) {
        //this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', this.defaultColor  );
        this.textColor = this.defaultColor;
    }
}
