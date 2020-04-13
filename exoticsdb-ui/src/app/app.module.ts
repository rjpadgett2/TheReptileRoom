import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReptilesService } from './services/reptiles.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/pages/home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ViewAnimalsComponent } from './components/pages/view-animals/view-animals.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ReptileFormComponent } from './components/shared/reptile-form/reptile-form.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LoginFormComponent} from './components/shared/login-form/login-form.component';
import { RegistrationFormComponent } from './components/shared/registration-form/registration-form.component';
import { EditUserFormComponent } from './components/shared/edit-user-form/edit-user-form.component';
import {ApiService} from './services/api.service';
import { OAuthModule} from 'angular-oauth2-oidc';
import { BasicAuthInterceptor } from './services/basic-auth.interceptors';
import {AuthGuard} from './services/auth-guard.service';
import { CookieService } from 'angular2-cookie/core';
import {RefreshTokenInterceptor} from './services/RefreshTokenInterceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormErrorComponent } from './components/shared/form-error/form-error.component';
import { LoggedIn } from './services/logged-in';
import { PieChartComponent } from './components/shared/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './components/shared/line-chart/line-chart.component';
import { FeederFormComponent } from './components/shared/feeder-form/feeder-form.component';
import { FeederService } from './services/feeder.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewAnimalsComponent,
    DashboardComponent,
    ReptileFormComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    EditUserFormComponent,
    FormErrorComponent,
    PieChartComponent,
    LineChartComponent,
    FeederFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    OAuthModule,
    FontAwesomeModule,
    ChartsModule
  ],
  providers: [
    ReptilesService,
    ApiService,
    BasicAuthInterceptor,
    AuthGuard,
    CookieService,
    RefreshTokenInterceptor,
    LoggedIn,
    FeederService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ReptileFormComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    FeederFormComponent
  ]
})
export class AppModule { }
