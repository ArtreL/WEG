import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export function createAuthConfig(callbackUrl: string): AuthConfig {
  return {
    // Url of the Identity Provider
    issuer: 'https://bif4-web-identity.azurewebsites.net',
    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: 'bif4ss2018ue5',
    redirectUri: callbackUrl,
    postLogoutRedirectUri: callbackUrl,
    requireHttps: environment.production,
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: 'openid profile ue5-api'
  };
}
