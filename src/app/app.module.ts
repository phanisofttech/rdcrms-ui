import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LeftNavComponent } from './left-nav/left-nav.component';
import { FooterComponent } from './footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { ReportsComponent } from './reports/reports.component';
import { UserRegisterationComponent } from './registration/user-registeration/user-registeration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChartModule } from 'primeng/chart';
import { AllUsersComponent } from './all-users/all-users.component';
import { TableModule } from 'primeng/table';
import { CasteComponent } from './caste/caste.component';
import { IncomeComponent } from './income/income.component';
import { BirthComponent } from './birth/birth.component';
import { DeathComponent } from './death/death.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    LeftNavComponent,
    FooterComponent,
    ReportsComponent,
    UserRegisterationComponent,
    AllUsersComponent,
    CasteComponent,
    IncomeComponent,
    BirthComponent,
    DeathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    ChartModule,
    TableModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
