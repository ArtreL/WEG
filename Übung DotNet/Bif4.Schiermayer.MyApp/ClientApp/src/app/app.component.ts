import { Component, OnInit, Inject } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { createAuthConfig } from './auth.config';
import { DOCUMENT } from '@angular/common';

import { LehrveranstaltungenService, Lehrveranstaltung } from './services/lehrveranstaltungen.service';
import { LoginStatusComponent } from './components/login-status/login-status.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LehrveranstaltungenService]
})
export class AppComponent implements OnInit {

  constructor(private oAuthService: OAuthService, @Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    const callback = `${this.document.location.protocol}//${document.location.hostname}:${document.location.port}/`;
    this.oAuthService.configure(createAuthConfig(callback));
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.setStorage(localStorage);
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
}
