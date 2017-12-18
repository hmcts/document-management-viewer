import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { JwtService } from './jwt.service';

@Injectable()
export class SessionService {

  public static readonly KEY = '__dm-viewer-token';
  public static readonly SESSION_LIFESPAN: number = 8 * 60 * 60 * 1000;

  constructor(private cookieService: CookieService) {}

  createSession(authToken: object) {
    const expiresAt: Date = new Date();
    expiresAt.setTime(expiresAt.getTime() + SessionService.SESSION_LIFESPAN);

    this.cookieService.putObject(SessionService.KEY, authToken, {
      expires: expiresAt
    });
  }

  getSession(): any {
    let authToken: any = null;
    try {
      authToken = this.cookieService.getObject(SessionService.KEY);
    } catch (e) {
      console.log(e);
    }
    return authToken;
  }

  getUID(): string {
    const session = this.getSession();
    if (session != null) {
      try {
        const decoded = JwtService.decode(this.getSession()['token']);
        return decoded['id'];
      } catch (e) {
        console.log(e);
      }
    }
    return null;
  }
}
