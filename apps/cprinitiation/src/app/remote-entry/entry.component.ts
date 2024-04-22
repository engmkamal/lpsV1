import { 
  Component, 
  //ViewChild, 
  //ViewContainerRef
 } from '@angular/core';

@Component({
  selector: 'lps-configuration-entry',
  //template: `<lps-confighome></lps-confighome>`
  template: `<lps-navigation-bar [navigationInfo]="navigationInfo" ></lps-navigation-bar>`
})
export class RemoteEntryComponent {

  //name = 'Welcome From Entry Component ';
  // @ViewChild('navigation-bar', { read: ViewContainerRef })
  // lazyComponentContainer!: ViewContainerRef;

  public navigationInfo = {
    bLogo: "logoName",
    bName: "Loan Processing System",
    user:{
      name:"Tog Developer",
      email:"tosdev1@techoneglobal.com"
    }
  };

}
