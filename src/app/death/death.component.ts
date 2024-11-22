import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeathServiceService } from './service/death-service.service';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-death',
  templateUrl: './death.component.html',
  styleUrl: './death.component.css'
})
export class DeathComponent {

  deathForm: FormGroup;
  showSpinner: boolean = false;
  isFormSubmit: boolean = false;
  isRequestSend: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private deathService: DeathServiceService,
    private messageService: MessageService
  ) {
    this.deathForm = formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      gender: ['', Validators.required],
      dateOfDeath: ['', Validators.required],
      ageOfDeath: ['', Validators.required],
      fatherName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      motherName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      village: ['', Validators.required],
      mandal: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      causeOfDeath: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      typeOfDocument: ['Death'],
      status: ['new']
    })
  }

  saveDeathFormInfo() {
    if (this.deathForm?.valid) {
      const deathFormInfo = this.deathForm.value;
      this.isRequestSend = false;
      this.showSpinner = true;
      this.deathService.saveDeathFormDetails(deathFormInfo).subscribe(
        response => {
          this.showSpinner = false;
          this.isFormSubmit = true;
          this.messageService.add({ severity: 'success', summary: 'Form submitted sucessfully' });
        },
        error => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'error', summary: 'Form not submitted' });
        }
      )
    } else {
      this.showSpinner = false;
      this.messageService.add({ severity: 'error', summary: 'Fill all the fields' });
    }
  }
}
