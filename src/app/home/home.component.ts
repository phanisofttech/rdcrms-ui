import { Component } from '@angular/core';
import { HomeServiceService } from './service/home-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  aadhaarNumber: any;
  password: any;
  showSpinner: boolean = false;
  messageToast: any;

  constructor(
    private homeService: HomeServiceService,
    private router: Router,
    private messageService: MessageService
  ) { }

  onValidateLogin() { 
    this.showSpinner = true;
    this.homeService.getLogin(this.aadhaarNumber, this.password).subscribe(
      response => {
        const message = response.message;
        const statusCode = response.statusCode;
        const statusCodeValue = response.statusCodeValue;

        if (message === 'Login successfull' && statusCode === 'OK' && statusCodeValue === 200) {
          this.showSpinner = false;
          this.router.navigate(['/dashboard']);
        } else {
          this.show();
          this.showSpinner = false;
        }
      },
      error => {
        this.showSpinner = false;
        console.log("No response");
      }
    );
  }
  show() {
    this.messageService.add({ severity: 'error', summary: 'Incorrect Aadhaar Number and Password' });
    this.showSpinner = false;
  }

}

