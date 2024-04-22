import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[lpsFormconfigHost]',
})
export class FormconfigDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
