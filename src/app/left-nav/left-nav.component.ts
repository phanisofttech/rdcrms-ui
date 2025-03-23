import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css'
})
export class LeftNavComponent {


  private adminUsers: string[] = ['987654321111', '626641807205', '945271849457'];
  private currentUser: string = "0"; // Default value
  isAdmin: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {  // Check if it's running in the browser
      this.currentUser = localStorage.getItem('currentUser') || "0";
      this.isAdmin = this.adminUsers.includes(this.currentUser);
      console.log("Current User:", this.currentUser);
      console.log("Is Admin:", this.isAdmin);
    }
  }
  toggeleMenu(): void {
    let className = document.getElementById('side-bar')?.className;
    let ele: any = document.getElementById('side-bar') == null ? "" : document.getElementById('side-bar');

    if (className === 'sidebar') {
      ele.className = 'sidebar close';
    } else {
      ele.className = 'sidebar';
    }
  }

}
