import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesModule } from './services/services.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LvDetailComponent } from './components/lv-detail/lv-detail.component';
import { LvOverviewComponent } from './components/lv-overview/lv-overview.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LvCreateComponent } from './components/lv-create/lv-create.component';
import { LehrveranstaltungenComponent } from './components/lehrveranstaltungen/lehrveranstaltungen.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LvDetailComponent,
    LvOverviewComponent,
    NavbarComponent,
    LvCreateComponent,
    LehrveranstaltungenComponent,
    LoginStatusComponent
  ],
  imports: [
    OAuthModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    ServicesModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'details/:id', component: LvDetailComponent },
      { path: 'create', component: LvCreateComponent },
      { path: 'home', component: LvOverviewComponent },
    ])
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
