import { Directive, HostBinding, OnInit, HostListener, ElementRef, Input } from '@angular/core';
import { HeaderService } from '../header/header.service';


@Directive({
    selector:'[appDropdownHeader]'
})
export class DropdownHeaderDirective {



    @HostBinding('class.open') isOpen = false;
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) 
    {
      this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false; 
      this.headerservice.isDropdownOpen.next(this.isOpen); //I added this line!

    }
    constructor(private elRef: ElementRef,
                private headerservice: HeaderService) {}  
}


