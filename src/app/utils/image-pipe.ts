import { Pipe, PipeTransform } from '@angular/core';
import { Http, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {SessionService} from '../auth/session.service';

@Pipe({name: 'image'})
export class ImagePipe implements PipeTransform {
  constructor(private http: Http, private sessionService: SessionService ) {}

  transform(url: string) {
    const headers =
      new Headers({'Authorization': this.sessionService.getSession().token});
    return this.http.get(url, new RequestOptions({headers: headers, responseType: ResponseContentType.Blob}))
      .map(response => response.blob())
      .switchMap(blob => {
        return Observable.create(observer => {
          const  reader = new FileReader();
          reader.readAsDataURL(blob); // convert blob to base64
          reader.onloadend = function() {
            observer.next(reader.result); // emit the base64 string result
          };
        });
      });
  }
}
