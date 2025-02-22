import { Component, OnInit } from '@angular/core';
import { Country } from '../model/country.model';
import { District } from '../model/district.model';
import { Mandal } from '../model/mandal.model';
import { State } from '../model/state.model';
import { Village } from '../model/village.model';
import { LocationFilterServiceService } from './service/location-filter-service.service';
import { FilterResourceApplicationResponse } from '../model/FilterResourceApplicationResponse';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrl: './location-filter.component.css'
})
export class LocationFilterComponent implements OnInit {

  constructor(private locationService: LocationFilterServiceService) { }

  selectedCountry: string = '';
  selectedState: string = '';
  selectedDistrict: string = '';
  selectedMandal: string = '';
  selectedVillage: string = '';

  // Arrays for dropdown options
  countries: Country[] = [];
  states: State[] = [];
  districts: District[] = [];
  mandals: Mandal[] = [];
  villages: Village[] = [];

  ngOnInit(): void {
    this.locationService.getCountries().subscribe(
      response => {
        this.countries = response;
      },
      error => {
        console.log("Error fetching countries");
      }
    );
  }

  onCountryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCountry = selectElement.value;
    const selectedCountry = this.countries.find(country => country.countryName === this.selectedCountry);
    const countryId = selectedCountry?.countryId;

    if (countryId) {
      this.states = [];
      this.districts = [];
      this.mandals = [];
      this.villages = [];

      this.locationService.getStatesByCountryId(countryId).subscribe(
        response => {
          this.states = response;
        },
        error => {
          console.log("State error");
        }
      );
    }
  }

  onStateChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedState = selectElement.value;
    const selectedState = this.states.find(state => state.stateName === this.selectedState);
    const stateId = selectedState?.stateId;

    if (stateId) {
      this.districts = [];
      this.mandals = [];
      this.villages = [];

      this.locationService.getDistrictsByStateId(stateId).subscribe(
        response => {
          this.districts = response;
        },
        error => {
          console.log("District error");
        }
      );
    }
  }

  onDistrictChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedDistrict = selectElement.value;
    const selectedDistrict = this.districts.find(district => district.districtName === this.selectedDistrict);
    const districtId = selectedDistrict?.districtId;

    if (districtId) {
      this.mandals = [];
      this.villages = [];

      this.locationService.getMandalsByDistrictId(districtId).subscribe(
        response => {
          this.mandals = response;
        },
        error => {
          console.log("Mandal error");
        }
      );
    }
  }

  onMandalChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedMandal = selectElement.value;
    const selectedMandal = this.mandals.find(mandal => mandal.mandalName === this.selectedMandal);
    const mandalId = selectedMandal?.mandalId;

    if (mandalId) {
      this.villages = [];

      this.locationService.getVillagesByMandalId(mandalId).subscribe(
        response => {
          this.villages = response;
        },
        error => {
          console.log("Village error");
        }
      );
    }
  }

  onVillageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedVillage = selectElement.value;
  }

  basicData: any;
  pieData: any;
  isDataPresent: boolean = false;
  isNotThereData: boolean = false;
  isNoInfo: boolean = false;
  locationReports: FilterResourceApplicationResponse[] = [];

  onSubmit() {
    console.log("🎯 Final Selections:");
    console.log("Country:", this.selectedCountry);
    console.log("State:", this.selectedState);
    console.log("District:", this.selectedDistrict);
    console.log("Mandal:", this.selectedMandal);
    console.log("Village:", this.selectedVillage);

    this.locationService.getFilterOfResourceAllocation(this.selectedCountry,
      this.selectedState, this.selectedDistrict, this.selectedMandal,
      this.selectedVillage).subscribe(
        (response: FilterResourceApplicationResponse[] | null | undefined) => {
          if (response && response.length > 0) { // Check if response is not null/undefined and contains data
            this.locationReports = response;
            this.isNoInfo = true;
            this.updateCharts();
            console.log(response);
            this.isDataPresent = true;
            this.isNotThereData = false;
            console.log("Success");
          } else {
            console.log("No data found");
            this.isNoInfo = false;
            this.isDataPresent = false;
            this.isNotThereData = true; // Set to false when no data is returned
          }
          // this.selectedCountry='';
          // this.selectedState='';
          // this.selectedDistrict='';
          // this.selectedMandal='';
          // this.selectedVillage='';
        },
        (error) => {
          console.error("Error fetching data:", error);
          this.isDataPresent = false; // Ensure UI updates correctly on error
        }
      );
  }
  updateCharts() {
    const labels = this.locationReports.map(item => item.country);
    const receivedValues = this.locationReports.map(item => item.applicationsRecevied);
    const inprogressValues = this.locationReports.map(item => item.applicationsInprogress);
    const approvedValues = this.locationReports.map(item => item.applicationsApproved);
    const rejectedValues = this.locationReports.map(item => item.applicationsRejected);

    /** ✅ Bar Chart */
    this.basicData = {
      labels: labels,
      datasets: [
        {
          label: 'Applications Received',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: receivedValues
        },
        {
          label: 'Applications Inprogress',
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          data: inprogressValues
        },
        {
          label: 'Applications Approved',
          backgroundColor: '#66BB6A',
          borderColor: '#388E3C',
          data: approvedValues
        },
        {
          label: 'Applications Rejected',
          backgroundColor: '#FF6384',
          borderColor: '#D32F2F',
          data: rejectedValues
        }
      ]
    };
    this.pieData = {
      labels: ['Received', 'Inprogress', 'Approved', 'Rejected'],
      datasets: [{
        label: 'Application Status',
        backgroundColor: ['#42A5F5', '#66BB6A', '#66BB6A', '#FF6384'],
        data: [
          receivedValues.reduce((acc, val) => acc + val, 0),  // Total received
          inprogressValues.reduce((acc, val) => acc + val, 0),
          approvedValues.reduce((acc, val) => acc + val, 0),  // Total approved
          rejectedValues.reduce((acc, val) => acc + val, 0)   // Total rejected
        ]
      }]
    };

  }

}
