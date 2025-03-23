import { Component, OnInit } from '@angular/core';
import { RegistrationServiceService } from '../service/registration-service.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { OtpResponse } from '../../model/otp-response';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrl: './user-registeration.component.css'
})
export class UserRegisterationComponent{

  public aadhaarNumber: any;
  public otp: any;
  public message: string = '';
  public showSpinner: boolean = false;
  public isOtpSent: boolean = false;
  public isPasswordSent: boolean = false;

  constructor(
    private regService: RegistrationServiceService,
    private messageService: MessageService,
    private router: Router
  ) { }

  onValidateAadhaarNumber() {
    this.showSpinner = true;
    this.regService.getOTPByAadhaarNumber(this.aadhaarNumber).subscribe(
      (response: OtpResponse) => {
        this.assignToMessage(response);
        if (response.statusCodeValue === 404) {
          this.isOtpSent = false;
        } else {
          this.isOtpSent = true;
          this.showSpinner = false;
        }
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: "Failed to generate OTP" });
        this.showSpinner = false;
        this.isOtpSent = false;
      }
    );
  }

  onVerifyOtp() {
    this.showSpinner = true;
    this.regService.getPasswordByOtp(this.otp, this.aadhaarNumber).subscribe(
      (response: OtpResponse) => {
        this.showSpinner = false;
        this.assignToMessage(response);
        if (response.statusCodeValue === 401) {
          this.isPasswordSent = false;
        } else {
          alert("Password sent to your registered mail. Click OK to navigate to home page");
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.showSpinner = false;
        this.messageService.add({ severity: 'error', summary: 'Incorrect OTP', detail: 'Password Not Sent .' });
      }
    );
  }

  assignToMessage(resp: any) {
    this.message = resp.message;
    if (this.message.includes('User not found with the Aadhaar Number')) {
      this.messageService.add({ severity: 'error', summary: this.message });
    } else if (this.message.includes('Incorrect OTP')) {
      this.messageService.add({ severity: 'error', summary: this.message });
    } else {
      this.messageService.add({ severity: 'success', summary: this.message });
    }
    this.showSpinner = false;
  }

}
