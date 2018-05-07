import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private oAuthService: OAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.oAuthService.hasValidAccessToken()) {
      const headers = req.headers.set('Authorization', 'Bearer ' + this.oAuthService.getAccessToken());
      const authenticatedRequest = req.clone({ headers });
      return next.handle(authenticatedRequest);
    } else {
      return next.handle(req);
    }
  }

}
