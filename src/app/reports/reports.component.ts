import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CertificateCountService } from './service/certificate-count.service';
import { CertificateCount } from '../model/certificate-count';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {

    basicData: any;
    pieData: any;
    certificateCounts: CertificateCount[] = [] ;


    constructor(private certificateCountService : CertificateCountService){}

    getCertificatesDetails(){
       this.certificateCountService.getCertificateCounts().subscribe(
        (response : CertificateCount[])=> {
           this.certificateCounts = response;
           this.barChart();
           this.pieChart();
        }
       )
    }

    ngOnInit() {
      this.getCertificatesDetails();
  }

  barChart(){
    const labels = this.certificateCounts.map(item => item.certificateType);
    const dataValues = this.certificateCounts.map(item => item.totalCount);

    this.basicData = {
        labels: labels,
        datasets: [
            {
                label: 'Certificate Counts',
                backgroundColor: '#42A5F5', // Bar color
                borderColor: '#1E88E5', // Border color
                data: dataValues // Assign data values
            }
        ]
    };

  }

  pieChart(){
    const labels = this.certificateCounts.map(item => item.certificateType);
    const dataValues = this.certificateCounts.map(item => item.totalCount);

    this.pieData = {
        labels: labels, // Labels for the pie slices
        datasets: [{
            label: 'Certificate Counts',
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ], // Colors for each slice
            data: dataValues // Data values for each slice
        }]
    };
  }


}
