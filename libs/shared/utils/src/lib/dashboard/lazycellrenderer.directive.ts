import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[lpsLazycellrendererHost]',
})
export class LazycellrendererDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
