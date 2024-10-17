import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrl: './user-registeration.component.css'
})
export class UserRegisterationComponent implements OnInit{

  aadhaarNumber: number = 945271849457;
  otp: number=1212;
  generatedPassword:String ="hsjskaa87ab";
  
  constructor() {
  }
  
  ngOnInit(): void {
  }
  
  onValidateAadhaarNumber() {
    console.log("Aadhaar Number Submitted:", this.aadhaarNumber);
  }

  onVerifyOtp() {
    console.log("OTP Submitted:", this.otp);
  }
  

}
