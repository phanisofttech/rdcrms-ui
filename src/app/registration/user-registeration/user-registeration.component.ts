import { Component, OnInit } from '@angular/core';
import { RegistrationServiceService } from '../service/registration-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrl: './user-registeration.component.css'
})
export class UserRegisterationComponent implements OnInit {

  public aadhaarNumber: any;
  public otp: any;
  public message: string = '';
  public showSpinner: boolean = false;
  public otpSent: boolean = false;
  public loginLink: boolean = false;

  constructor(
    private regService: RegistrationServiceService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onValidateAadhaarNumber() {
    this.showSpinner = true;
    console.log("Aadhaar Number Submitted:", this.aadhaarNumber);
    this.regService.getOTPByAdharNumber(this.aadhaarNumber).subscribe(
      response => {
        console.log("api response: " + JSON.stringify(response));
        this.assignToMessage(response);
        this.otpSent = true;
      },
      (error: Error) => {
        this.messageService.add({ severity: 'error', summary: "Failed to send generate OTP" });
        this.showSpinner = false;
      }

    );
  }

  onVerifyOtp() {
    this.showSpinner = true;
    console.log("OTP Submitted:", this.otp);
    this.regService.getPasswordByOtp(this.otp, this.aadhaarNumber).subscribe(
      response => {
        this.showSpinner = false;
        console.log("api response: " + JSON.stringify(response));
        this.assignToMessage(response);
        this.loginLink = true;
      },
      error => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Incorrect OTP', detail: 'Password Not Sent .' });
        console.log("error");
      }
    );
  }

  assignToMessage(resp: any) {
    this.message = resp.message;
    console.log(" message: " + this.message);
    this.messageService.add({ severity: 'success', summary: this.message });
    this.showSpinner = false;
  }

}
