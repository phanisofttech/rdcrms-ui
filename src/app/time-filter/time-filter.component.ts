import { Component } from '@angular/core';
import { TimeFilterService } from './service/time-filter.service';
import { FilterCertificateCount } from '../model/filter-certificate-count';

@Component({
  selector: 'app-time-filter',
  templateUrl: './time-filter.component.html',
  styleUrl: './time-filter.component.css'
})
export class TimeFilterComponent {

  constructor(private timeFilterService : TimeFilterService){}

  years: any[] = [];
  months: any[] = [];
  dates: any[] = [];

  selectedYear: any | undefined;
  selectedMonth: any | undefined;
  selectedDate: any | undefined;


  basicData: any;
  pieData: any;

  ngOnInit() {
    this.initializeYears();
  }

  initializeYears() {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 50; i--) {
      this.years.push(i);
    }
  }

  onYearChange() {
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.selectedMonth = undefined;
    this.dates = [];
  }

  onMonthChange() {
    const monthIndex = this.months.indexOf(this.selectedMonth!);
    const year = this.selectedYear!;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    this.dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    this.selectedDate = undefined;
  }

  isDataPresent : boolean = false ;
  isNotThereData :  boolean = false ;
  isNoInfo :  boolean = false ;
  timeReports : FilterCertificateCount[] = [];

  onSubmit() {
    console.log('Year:', this.selectedYear);
    console.log('Month:', this.selectedMonth);
    console.log('Date:', this.selectedDate);
  
    this.timeFilterService.doFilterBasedOnTime(this.selectedYear, this.selectedMonth, this.selectedDate)
      .subscribe(
        (response: FilterCertificateCount[] | null | undefined) => {
          if (response && response.length > 0) { // Check if response is not null/undefined and contains data
            this.timeReports = response;
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
  
          // Reset selections
          this.selectedYear = null;
          this.selectedMonth = null;
          this.selectedDate = null;
        },
        (error) => {
          console.error("Error fetching data:", error);
          this.isDataPresent = false; // Ensure UI updates correctly on error
        }
      );
  }

  updateCharts() {
    const labels = this.timeReports.map(item => item.month);
    const receivedValues = this.timeReports.map(item => item.applicationsRecevied);
    const inprogressValues = this.timeReports.map(item => item.applicationsInprogress);
    const approvedValues = this.timeReports.map(item => item.applicationsApproved);
    const rejectedValues = this.timeReports.map(item => item.applicationsRejected);

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
      labels: ['Received','Inprogress' ,'Approved', 'Rejected'],
      datasets: [{
        label: 'Application Status',
        backgroundColor: ['#42A5F5','#66BB6A', '#66BB6A', '#FF6384'],
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
