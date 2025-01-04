import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../../model/user-response';

@Injectable({
  providedIn: 'root'
})
export class AllUsersServiceService {

  constructor(private http: HttpClient) { }

  userApi = "http://localhost:5000/api/user/all-users"

  getAllUsers(): Observable<UserResponse[]> {

    return this.http.get<UserResponse[]>(this.userApi);
  }
}
