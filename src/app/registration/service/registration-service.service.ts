import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  localApiUrl = "http://localhost:5001/api/login/";
  //const devApiUrl = "https://pst-login-service.el.r.appspot.com/api/login/otp/100010001000";

  constructor(private http: HttpClient) { }


  public getOTPByAdharNumber(adharNumber: number) {
    console.log("this is service");
    return this.http.post(this.localApiUrl + `otp/${adharNumber}`, "");
  }

  getPasswordByOtp(otp: number, aadhaarNumber: number) {
    console.log("otp service is cmg");
    return this.http.post(this.localApiUrl + `password/${aadhaarNumber}/${otp}`, " ");
  }
}
