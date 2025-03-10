import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { FilterCertificateCount } from '../../model/filter-certificate-count';

@Injectable({
  providedIn: 'root'
})
export class TimeFilterService {

  localApiUrl: any ;

  constructor(private http : HttpClient) { }

  public doFilterBasedOnTime(year : any , month : any , date : any): Observable<FilterCertificateCount[]>{

    if(year!= null && month!= null && date!=null){
      this.localApiUrl = `http://localhost:5000/api/filter-certificate-time/${year}/${month}/${date}`; 
    }else if(year != null && month == null && date == null){
      this.localApiUrl = `http://localhost:5000/api/filter-certificate-time/${year}`; 
    }else if (year != null && month != null && date == null){
      this.localApiUrl = `http://localhost:5000/api/filter-certificate-time/${year}/${month}`;
    }else{
      console.log("Error");
      return throwError(() => new Error("Invalid parameters"));
    }
   return this.http.get<FilterCertificateCount[]>(this.localApiUrl);
  }
}
