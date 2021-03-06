import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService implements CanActivate {
  auth0 = new auth0.WebAuth({
    clientID: environment.auth0_client_id,
    domain: environment.auth0_domain,
    responseType: 'token id_token',
    redirectUri: environment.auth0_callbackURL,
    scope: 'openid'
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    // Verifies above auth0 settings against those
    // returned in the callback url hash
    this.auth0.parseHash((err, authResult) => {
      // Following block runs after user enters auth0 credentials
      // and auth0 redirects to callback route
      if (authResult && authResult.accessToken && authResult.idToken) {
        // Do not clear url hash, race condition
        // redirects page back to callback route
        // window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  canActivate() {
    if (environment.envName === 'dev' || this.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }
}
