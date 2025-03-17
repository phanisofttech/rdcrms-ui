import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OtpResponse } from '../../model/otp-response';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  localApiUrl = "http://localhost:5001/api/login/";
  //const devApiUrl = "https://pst-login-service.el.r.appspot.com/api/login/otp/100010001000";

  constructor(private http: HttpClient) { }

  public getOTPByAadhaarNumber(aadhaarNumber: number): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(this.localApiUrl + `otp/${aadhaarNumber}`, "");
  }

  getPasswordByOtp(otp: number, aadhaarNumber: number): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(this.localApiUrl + `password/${aadhaarNumber}/${otp}`, " ");
  }
}
