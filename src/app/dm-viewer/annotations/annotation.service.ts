import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {SessionService} from '../../auth/session.service';

export class Note {
  content: string;
  uuid: string;
  page: number;


  constructor(content: string = '', uuid: string = '', page: number = 1) {
    this.content = content;
    this.uuid = uuid;
    this.page = page;
  }
}

@Injectable()
export class AnnotationService {
  constructor(private httpClient: HttpClient,
              private sessionService: SessionService,
              private appConfig: AppConfig) {
  }

  getNotes(url): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.sessionService.getSession().token}`,
          'Accept': 'application/json'
        })
      };
      const annoUrl = `${this.appConfig.getAnnotationUrl()}/find-all-by-document-url?url=${url}`;
      this.httpClient.get<any>(annoUrl, httpOptions).subscribe(response => {
        if (response._embedded.annotationSets && response._embedded.annotationSets.length) {
          const set = response._embedded.annotationSets[0];
          const notes = set.annotations
            .filter(annotation => annotation.type === 'PAGENOTE')
            .sort((a, b) => a.page - b.page)
            .map(annotation => {
              return new Note(annotation.comments[0].content, annotation.page, annotation.uuid);
            });
          resolve(notes);
        }
        resolve(new Array<Note>());
      }, reject);
    });
  }

}
