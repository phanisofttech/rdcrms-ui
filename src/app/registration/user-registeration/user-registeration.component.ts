import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrl: './user-registeration.component.css'
})
export class UserRegisterationComponent implements OnInit{

  adharNumber: number = 100;
  
  constructor() {
  }
  
  ngOnInit(): void {
  }


  validateAdhar(): void {
    console.log("adhar number is: "+this.adharNumber);
  }

  
  

}
