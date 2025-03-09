import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../model/country.model';
import { District } from '../../model/district.model';
import { Mandal } from '../../model/mandal.model';
import { State } from '../../model/state.model';
import { Village } from '../../model/village.model';
import { FilterResourceApplicationResponse } from '../../model/filter-resource-application-response';

@Injectable({
  providedIn: 'root'
})
export class LocationFilterServiceService {
  localApiUrl: any;

  constructor(private http: HttpClient) { }

  localApiRevenue = "http://localhost:5000/api/revenue/";

  public getFilterOfResourceAllocation(country: any, state: any, district: any, mandal: any, village: any): Observable<FilterResourceApplicationResponse[]> {

    const params = [country, state, district, mandal, village]
      .filter(param => param !== null && param !== undefined && param !== '');

    this.localApiUrl = `http://localhost:5000/api/filter-certificate-location/${params.join('/')}`;

    return this.http.get<FilterResourceApplicationResponse[]>(this.localApiUrl);
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.localApiRevenue + `countries`);
  }

  getStatesByCountryId(countryId: any): Observable<State[]> {
    return this.http.get<State[]>(this.localApiRevenue + `states/${countryId}`);
  }

  getDistrictsByStateId(stateId: any): Observable<District[]> {
    return this.http.get<District[]>(this.localApiRevenue + `districts/${stateId}`);
  }

  getMandalsByDistrictId(districtId: any): Observable<Mandal[]> {
    return this.http.get<Mandal[]>(this.localApiRevenue + `mandals/${districtId}`);
  }

  getVillagesByMandalId(mandalId: any): Observable<Village[]> {
    return this.http.get<Village[]>(this.localApiRevenue + `villages/${mandalId}`);
  }

}
function throwError(arg0: () => Error) {
  throw new Error('Function not implemented.');
}

