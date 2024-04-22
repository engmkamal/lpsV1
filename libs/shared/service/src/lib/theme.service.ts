// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ThemeService {

//   constructor() { }
// }
// //=================================================

import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private linkEle!: HTMLLinkElement;
  private scriptEle!: HTMLScriptElement;
  private cssFile!: string;
  private themeId: string = 'themeCSS';
  private renderer2!: Renderer2

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  setTheme(fileName: string, renderer2: Renderer2) {
    this.cssFile = `${fileName}`;
    this.removeExistingThemelinkEle(renderer2, this.themeId);
    
    // Create a link element via Angular's renderer to avoid SSR troubles
    this.linkEle = renderer2.createElement('link') as HTMLLinkElement;

    // Set type of the link item and path to the css file
    renderer2.setProperty(this.linkEle, 'rel', 'stylesheet');
    renderer2.setProperty(this.linkEle, 'href', this.cssFile);
    renderer2.setProperty(this.linkEle, 'id', this.themeId);

    // Add the linkEle to the head section
    renderer2.appendChild(this.document.head, this.linkEle);
  }

  removeExistingThemelinkEle(renderer2: Renderer2, themeId: string) {
    const themeIDHTMlElem = this.document.getElementById(themeId);
    if (themeIDHTMlElem) {
      renderer2.removeChild(this.document.head, themeIDHTMlElem);
    }
  }

  loadCss(fileName: string, themeId: string) {
    this.cssFile = `${fileName}`;
    
    const isLoaded = document.querySelectorAll(themeId);
    if(isLoaded.length > 0){
      console.log("Same linkEle is already loaded earlier");
      return;
    }

    this.removeExistingThemelinkEle(this.renderer2, this.themeId);
    
    // Create a link element via Angular's renderer to avoid SSR troubles
    this.linkEle = this.renderer2.createElement('link') as HTMLLinkElement;

    // Set type of the link item and path to the css file
    this.renderer2.setProperty(this.linkEle, 'rel', 'stylesheet');
    this.renderer2.setProperty(this.linkEle, 'href', this.cssFile);
    this.renderer2.setProperty(this.linkEle, 'id', this.themeId);

    // Add the linkEle to the head section
    this.renderer2.appendChild(this.document.head, this.linkEle);
  }

  reloadStyle(styleName: string, themeId: string) {
    const head = this.document.getElementsByTagName('head')[0];

    const themeLink = this.document.getElementById(
      themeId
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = themeId;
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  loadScript(url:string, clsName:string){
    const isLoaded = document.querySelectorAll(clsName);
    if(isLoaded.length > 0){
      console.log("Same script is already loaded earlier");
      return;
    }
    this.scriptEle = document.createElement('script') as HTMLScriptElement;
    this.scriptEle.src = url;
    // Set type of the link item and path to the css file
    this.renderer2.setProperty(this.scriptEle, 'type', 'text/javascript');

    document.body.appendChild(this.scriptEle);
    this.scriptEle.className = clsName;
    console.group("Loading dynamic script...");
  }
}
