import { Component, OnInit } from '@angular/core';
import { AllUsersServiceService } from './service/all-users-service.service';
import { UserResponse } from '../model/user-response';
import { response } from 'express';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent implements OnInit {

  constructor(private allUserService: AllUsersServiceService) {
  }

  ngOnInit(): void {
    this.displayAllUsers();
  }
  users: UserResponse[] = [];

  isUserPresent : boolean = false ;

  showSpinner: boolean = false;

  displayAllUsers() {
    this.showSpinner=true;
    this.allUserService.getAllUsers().subscribe(
      (response: UserResponse[]) => {
        this.users = response;
        this.isUserPresent = true ;
        this.showSpinner=false;
      }
    );
  }
}
