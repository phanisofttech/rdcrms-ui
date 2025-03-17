import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ReportsComponent } from './reports/reports.component';
import { UserRegisterationComponent } from './registration/user-registeration/user-registeration.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { CasteComponent } from './caste/caste.component';
import { IncomeComponent } from './income/income.component';
import { BirthComponent } from './birth/birth.component';
import { DeathComponent } from './death/death.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TimeFilterComponent } from './time-filter/time-filter.component';
import { LocationFilterComponent } from './location-filter/location-filter.component';


const routes: Routes = [
 { path: "", component: HomeComponent},
 { path: "home", component: HomeComponent},
 { path: "register", component: UserRegisterationComponent},
 { path: "dashboard", component: DashboardComponent, 
 children: [
  { path: "", component: ReportsComponent},
  { path: "reports", component: ReportsComponent },
  { path: "all-users", component: AllUsersComponent },
  { path: "caste", component:CasteComponent},
  { path: "income", component:IncomeComponent},
  { path: "birth", component:BirthComponent},
  { path: "death", component:DeathComponent},
  { path: "time-filter", component: TimeFilterComponent},
  { path: "location-filter", component: LocationFilterComponent},
  { path: "change-password", component:ChangePasswordComponent},
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
