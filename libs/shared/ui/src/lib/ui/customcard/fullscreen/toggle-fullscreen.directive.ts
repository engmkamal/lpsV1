import { Directive, HostListener } from '@angular/core';

import screenfull from 'screenfull';

@Directive({
  selector: '[lpsToggleFullscreen]'
})
export class ToggleFullscreenDirective {

  @HostListener('click') onClick() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
