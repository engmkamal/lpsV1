import { ElementRef, HostBinding, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: "root",
})

export class FullscreenService {
  private doc = <FullScreenDocument>document;

  @ViewChild('fsDiv') fs!: ElementRef;

  @HostBinding('class.is-fullscreen') isFullscreen = false;

  isActive = false;

  constructor() { }

  enter() {
    const el = this.doc.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
    else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  leave() {
    if (this.doc.exitFullscreen) this.doc.exitFullscreen();
    else if (this.doc.msExitFullscreen) this.doc.msExitFullscreen();
    else if (this.doc.mozCancelFullScreen) this.doc.mozCancelFullScreen();
    else if (this.doc.webkitExitFullscreen) this.doc.webkitExitFullscreen();
  }

  toggle() {
    if (this.enabled) this.leave();
    else this.enter();
  }

  get enabled() {
    return !!(
      this.doc.fullscreenElement ||
      this.doc.mozFullScreenElement ||
      this.doc.webkitFullscreenElement ||
      this.doc.msFullscreenElement
    );
  }

  openDivFullscreen(): void {
    this.isFullscreen = true;
    const el = this.fs.nativeElement;

    if (!this.doc.fullscreenElement &&    // alternative standard method
      !this.doc.mozFullScreenElement && !this.doc.webkitFullscreenElement) {  // current working methods
      if (el.requestFullscreen) {
        el.requestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      } else if (el.msRequestFullscreen) {

        el.msRequestFullscreen();
      }
    }

    setTimeout(() => {
      this.isActive = true;
    }, 500);
  }

  closeDivFullscreen(): void {
    this.isFullscreen = false;
    this.isActive =  false;
    if (this.doc.exitFullscreen) {
      this.doc.exitFullscreen();
    } else if (this.doc.msExitFullscreen) {
      this.doc.msExitFullscreen();
    } else if (this.doc.mozCancelFullScreen) {
      this.doc.mozCancelFullScreen();
    } else if (this.doc.webkitExitFullscreen) {
      this.doc.webkitExitFullscreen();
    }
  }

}

interface FullScreenDocument extends Document {
  documentElement: FullScreenDocumentElement;
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}

interface FullScreenDocumentElement extends HTMLElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}
