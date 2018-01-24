import { Pipe, PipeTransform } from '@angular/core';
import {Http, RequestOptions, Headers, ResponseContentType, ResponseType} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {SessionService} from '../auth/session.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Pipe({name: 'image'})
export class ImagePipe implements PipeTransform {
  constructor(private http: HttpClient, private sessionService: SessionService ) {}

  transform(url: string) {
    const options: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: HttpParams,
      reportProgress?: boolean,
      responseType: 'blob',
      withCredentials?: boolean
    } = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.sessionService.getSession().token}` }),
      responseType: 'blob'
    };
    return this.http.get(url, options)
      .switchMap(blob => {
        return Observable.create(observer => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); // convert blob to base64
          reader.onloadend = function() {
            observer.next(reader.result); // emit the base64 string result
          };
        });
      });
  }
}
