import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BirthServiceService } from './service/birth-service.service';
import { MessageService } from 'primeng/api';
import { Country } from '../model/country.model';
import { State } from '../model/state.model';
import { District } from '../model/district.model';
import { Mandal } from '../model/mandal.model';
import { Village } from '../model/village.model';

@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrl: './birth.component.css'
})
export class BirthComponent implements OnInit {

  birthForm: FormGroup;
  public showSpinner: boolean = false;
  public isRequestSent: boolean = true;
  public isFormSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private birthService: BirthServiceService,
    private messageService: MessageService
  ) {
    this.birthForm = formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      aadhaarCardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      fatherName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      motherName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      village: ['', Validators.required],
      mandal: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      typeOfDocument: ['Birth'],
      status: ['Inprogress']
    })
  }

  saveBirthFormInfo() {
    if (this.birthForm?.valid) {
      const birthFormInfo = this.birthForm.value;
      this.isRequestSent = false;
      this.showSpinner = true;
      this.birthService.saveBirthDetails(birthFormInfo).subscribe(
        response => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'success', summary: "Form Submitted" });
          this.isRequestSent = false;
          this.isFormSubmit = true;
        },
        error => {
          this.showSpinner = false;
          this.messageService.add({ severity: 'error', summary: "Form Not Submitted" });
        }
      );
    } else {
      this.showSpinner = false;
      this.messageService.add({ severity: 'error', summary: "Fill all the feilds" });
    }

  }

  countries: Country[] = [];
  states: State[] = [];
  districts: District[] = [];
  mandals: Mandal[] = [];
  villages: Village[] = [];


  ngOnInit(): void {
    this.birthService.getCountries().subscribe(
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
      this.birthService.getStatesByCountryId(countryId).subscribe(
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
      this.birthService.getDistrictsByStateId(stateId).subscribe(
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
      this.birthService.getMandalsByDistrictId(districtId).subscribe(
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
      this.birthService.getVillagesByMandalId(mandalId).subscribe(
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
