import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ChangePasswordServiceService } from './service/change-password-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;
  public showSpinner: boolean = false;

  constructor(private fb: FormBuilder,
    private changePasswordService : ChangePasswordServiceService,
    private messageService: MessageService,
    private router : Router
    ) {
    this.changePasswordForm = this.fb.group(
      {
        aadhaarNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordsMatch }
    );
  }

  passwordsMatch(group: FormGroup): { [key: string]: boolean } | null {
    const oldPassword = group.get('oldPassword')?.value;
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    const errors: { [key: string]: boolean } = {};

    if (newPassword !== confirmPassword) {
      errors['passwordMismatch'] = true;
    }

    if (oldPassword === newPassword) {
      errors['sameAsOldPassword'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  onChangePassword() {
    this.showSpinner=true;
    if (this.changePasswordForm.valid) {
      const changePasswordInfo = this.changePasswordForm.value;
      this.changePasswordService.changePassword(changePasswordInfo).subscribe(
        response => {
          const message=response.message;
          if(message === 'User not found'){
            this.showSpinner=false;
            this.messageService.add({ severity: 'error', summary: "User not found" });
          }else if(message ==='Old password does not match'){
            this.showSpinner=false;
            this.messageService.add({ severity: 'error', summary: "Old password does not match" });
          }else if(message === 'Password update failed. Please check the details'){
            this.showSpinner=false;
            this.messageService.add({ severity: 'error', summary: "Password update failed. Please check the details" });
          }else {
            this.showSpinner=false;
            this.messageService.add({ severity: 'success', summary: "Password Changed" });
            this.router.navigate(['/home']);
          }
          
        },
        error => {
          this.showSpinner=false;
          this.messageService.add({ severity: 'error', summary: "Failed to Change Password" });
        }
      );
      
    } else {
      this.messageService.add({ severity: 'error', summary: "Form is invalid" });
    }
  }
}
