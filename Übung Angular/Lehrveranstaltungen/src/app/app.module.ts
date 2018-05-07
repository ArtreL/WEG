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
import { MatNativeDateModule, MatError } from '@angular/material';

import { AppComponent } from './app.component';
import { LvDetailComponent } from './components/lv-detail/lv-detail.component';
import { LvOverviewComponent } from './components/lv-overview/lv-overview.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LvCreateComponent } from './components/lv-create/lv-create.component';
import { LehrveranstaltungenComponent } from './components/lehrveranstaltungen/lehrveranstaltungen.component';


@NgModule({
  declarations: [
    AppComponent,
    LvDetailComponent,
    LvOverviewComponent,
    NavbarComponent,
    LvCreateComponent,
    LehrveranstaltungenComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ServicesModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatError,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'details/:id', component: LvDetailComponent },
      { path: 'create', component: LvCreateComponent },
      { path: 'home', component: LvOverviewComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
