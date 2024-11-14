import { Component } from '@angular/core';


@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrl: './left-nav.component.css'
})
export class LeftNavComponent {

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
