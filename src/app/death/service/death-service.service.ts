import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeathServiceService {

  constructor(private http: HttpClient) { }

  deathApi = "http://localhost:5000/api/request/sendCertificateRequest";

  saveDeathFormDetails(deathFormInfo: any) {

    return this.http.post(this.deathApi, deathFormInfo);
  }
}
