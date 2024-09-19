import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
 { path: "", component: HomeComponent},
 { path: "home", component: HomeComponent},
 { path: "dashboard", component: DashboardComponent, 
 children: [
  { path: "", component: ReportsComponent},
  { path: "reports", component: ReportsComponent }
]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
