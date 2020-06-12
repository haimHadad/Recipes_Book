import { Directive, HostBinding, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { HeaderService } from '../header/header.service';


@Directive({
    selector:'[appDropdown]'
})
export class DropdownDirective {



    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) 
    {
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false; 

    }
    constructor(private elRef: ElementRef) {}  
}


