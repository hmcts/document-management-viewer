import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppConfig {

  public static readonly CONFIG_PATH = '/assets/config.json';

  private config: Config;

  constructor(private http: HttpClient) {}

  public load(): Promise<void> {
    console.log('Loading app config...');

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(AppConfig.CONFIG_PATH)
          .subscribe((config: Config) => {
            this.config = config;
            console.log('Loading app config: OK');
            resolve();
          }, error => {
            console.error('Configuration file "config.json" could not be read');
            reject();
            return Observable.throw(error.json().error || 'Server error');
          });
    });
  }

  public getLoginUrl(): string {
    return this.config.login_url;
  }

  getAnnotationUrl() {
    return this.config.annotation_url;
  }
}

export class Config {
  login_url: string;
  annotation_url: string;
}
