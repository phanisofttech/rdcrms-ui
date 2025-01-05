import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeathServiceService } from './service/death-service.service';
import { MessageService } from 'primeng/api';
import { Country } from '../model/country.model';
import { District } from '../model/district.model';
import { Mandal } from '../model/mandal.model';
import { State } from '../model/state.model';
import { Village } from '../model/village.model';



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
      status: ['Inprogress']
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

  countries: Country[] = [];
  states: State[] = [];
  districts: District[] = [];
  mandals: Mandal[] = [];
  villages: Village[] = [];


  ngOnInit(): void {
    this.deathService.getCountries().subscribe(
      response => {
        this.countries = response;
      },
      error => {
        console.log("country error")
      }
    );
  }

  onCountryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const countryName = selectElement.value;

    const selectedCountry = this.countries.find(country => country.countryName === countryName);
    const countryId = selectedCountry?.countryId;

    if (countryId) {
      this.states = [];
      this.districts = [];
      this.mandals = [];
      this.villages = [];
      this.deathService.getStatesByCountryId(countryId).subscribe(
        response => {
          this.states = response;
        },
        error => {
          console.log("state error");
        }
      );
    }
  }

  onStateChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const stateName = selectElement.value;

    // Find the corresponding ID
    const selectedState = this.states.find(state => state.stateName === stateName);
    const stateId = selectedState?.stateId;

    // Fetch districts based on the state ID
    if (stateId) {
      this.districts = [];
      this.mandals = [];
      this.villages = [];
      this.deathService.getDistrictsByStateId(stateId).subscribe(
        response => {
          this.districts = response;
        },
        error => {
          console.log("district error");
        }
      );
    }
  }

  onDistrictChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const districtName = selectElement.value;

    // Find the corresponding ID
    const selectedDistrict = this.districts.find(district => district.districtName === districtName);
    const districtId = selectedDistrict?.districtId;

    // Fetch mandals based on the district ID
    if (districtId) {
      this.mandals = [];
      this.villages = [];
      this.deathService.getMandalsByDistrictId(districtId).subscribe(
        response => {
          this.mandals = response;
        },
        error => {
          console.log("mandal error");
        }
      );
    }
  }


  onMandalChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const mandalName = selectElement.value;

    // Find the corresponding ID
    const selectedMandal = this.mandals.find(mandal => mandal.mandalName === mandalName);
    const mandalId = selectedMandal?.mandalId;

    // Fetch villages based on the mandal ID
    if (mandalId) {
      this.villages = [];
      this.deathService.getVillagesByMandalId(mandalId).subscribe(
        response => {
          this.villages = response;
        },
        error => {
          console.log("village error");
        }
      );
    }
  }
}
