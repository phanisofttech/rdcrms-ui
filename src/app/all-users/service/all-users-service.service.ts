import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../model/user-response';

@Injectable({
  providedIn: 'root'
})
export class AllUsersServiceService {

  constructor(private http: HttpClient) { }
  //userApi = "https://pst-user-service.df.r.appspot.com/api/user/all-users";
  userApi = "http://localhost:5000/api/user/all-users"

  getAllUsers(): Observable<UserResponse[]> {

    return this.http.get<UserResponse[]>(this.userApi);
  }
}
