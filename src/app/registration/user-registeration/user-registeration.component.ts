import { Component, OnInit } from '@angular/core';
import { RegistrationServiceService } from '../service/registration-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrl: './user-registeration.component.css'
})
export class UserRegisterationComponent implements OnInit{

  public aadhaarNumber: any;
  public otp: any;
  public message: string = '';
  public showSpinner: boolean = false;
  
  constructor(
    private regService : RegistrationServiceService,
    private messageService: MessageService
    ) {}
  
  ngOnInit(): void {
  }
  
  onValidateAadhaarNumber() {
    this.showSpinner = true;
    console.log("Aadhaar Number Submitted:", this.aadhaarNumber);
    this.regService.getOTPByAdharNumber(this.aadhaarNumber).subscribe(
      response => {
        console.log("api response: "+JSON.stringify(response));
        this.assignToMessage(response);
      },
      (error: Error) => {
        this.messageService.add({ severity: 'error', summary: "Failed to send generate OTP"});
        this.showSpinner = false;
      }
      
    );
  }

  onVerifyOtp() {
    console.log("OTP Submitted:", this.otp);
  }

  assignToMessage(resp: any) {
    this.message = resp.message;
    console.log(" message: "+this.message);
    this.messageService.add({ severity: 'success', summary: this.message});
    this.showSpinner = false;
  }
  

}
