import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[lpsFormrendererHost]',
})
export class FormrendererDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
