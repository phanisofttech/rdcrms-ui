import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordServiceService {

  localApiUrl = "http://localhost:5000/api/user/change-password"

  constructor(private http : HttpClient) { }

  public changePassword(changePasswordInfo:any):Observable<any>{
    return this.http.post(this.localApiUrl,changePasswordInfo);
  }
}
