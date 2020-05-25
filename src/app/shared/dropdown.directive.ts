import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
selector: '[appDropdown]',
exportAs: 'appDropdown'
})
export class DropdownDirective {

@HostBinding('class.open') isOpen = false;

@HostListener('click') toggleDropdown() {
this.isOpen = !this.isOpen;
    }
}
