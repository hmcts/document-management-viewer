import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppConfig {

  private static readonly CONFIG_PATH = '/assets/config.json';

  private config: Config;

  constructor(private http: Http) {}

  public load(): Promise<void> {
    console.log('Loading app config...');

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(AppConfig.CONFIG_PATH)
        .map(response => response.json())
        .catch((error: any): any => {
          console.error('Configuration file "config.json" could not be read');
          reject();
          return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((config: Config) => {
          this.config = config;
          console.log('Loading app config: OK');
          resolve();
        });
    });
  }

  public getLoginUrl(): string {
    return this.config.login_url;
  }

}

export class Config {
  login_url: string;
}
