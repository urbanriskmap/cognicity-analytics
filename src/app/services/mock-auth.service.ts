import { CanActivate } from '@angular/router';
import { environment } from '../../environments/environment';

export class MockAuthService implements CanActivate {
  constructor() { }

  public login(): void {
  }

  public handleAuthentication(): void {
  }

  private setSession(authResult): void {
  }

  public logout(): void {
  }

  public isAuthenticated(): boolean {
    return true;
  }

  canActivate() {
    if (environment.envName === 'dev' || this.isAuthenticated()) {
      return true;
    }

    return false;
  }
}
