import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateCount } from '../../model/certificate-count';

@Injectable({
  providedIn: 'root'
})
export class CertificateCountService {

  localApiUrl = "http://localhost:5000/api/user/certificate_status"

  constructor(private http : HttpClient) { }

  getCertificateCounts(): Observable<CertificateCount[]>{
    return this.http.get<CertificateCount[]>(this.localApiUrl);
  }
}
