import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoRepository } from './todo-repository.service';
import { DateValueAccessorDirective } from './todo-create/date-value-accessor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MainComponent } from './main/main.component';
import { LoginStatusComponent } from './login-status/login-status.component';
import { AuthCallbackComponent } from './auth-callback/auth-callback.component';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoCreateComponent,
    DateValueAccessorDirective,
    MainComponent,
    LoginStatusComponent,
    AuthCallbackComponent
  ],
  imports: [
    OAuthModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent, pathMatch: 'full' },
      { path: 'auth-callback', redirectTo: '' }
    ])
  ],
  providers: [
    TodoRepository,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
