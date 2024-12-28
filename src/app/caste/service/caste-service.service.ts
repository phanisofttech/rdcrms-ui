import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../model/country.model';
import { District } from '../../model/district.model';
import { Mandal } from '../../model/mandal.model';
import { State } from '../../model/state.model';
import { Village } from '../../model/village.model';

@Injectable({
  providedIn: 'root'
})
export class CasteServiceService {

  localApi = "http://localhost:5000/api/request/sendCertificateRequest";

  localApiRevenue = "http://localhost:5000/api/revenue/";

  constructor(private http: HttpClient) { }

  saveCasteDetails(casteFormInfo: any) {
    return this.http.post(this.localApi, casteFormInfo);
  }

  getCountries():Observable<Country[]>{
    return this.http.get<Country[]>(this.localApiRevenue + `countries`);
  }

  getStatesByCountryId(countryId:any): Observable<State[]>{
    return this.http.get<State[]>(this.localApiRevenue + `states/${countryId}`);
  }

  getDistrictsByStateId(stateId:any):Observable<District[]>{
    return this.http.get<District[]>(this.localApiRevenue + `districts/${stateId}`);
  }

  getMandalsByDistrictId(districtId:any):Observable<Mandal[]>{
    return this.http.get<Mandal[]>(this.localApiRevenue + `mandals/${districtId}`);
  }

  getVillagesByMandalId(mandalId : any): Observable<Village[]>{
    return this.http.get<Village[]>(this.localApiRevenue + `villages/${mandalId}`);
  }
}
