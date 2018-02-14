import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {SessionService} from '../../auth/session.service';

const pageNoteType = 'PAGENOTE';

export class Note {
  content: string;
  uuid: string;
  page: number;

  constructor(content: string = '', uuid: string = '', page: number = 1) {
    this.content = content;
    this.uuid = uuid;
    this.page = page;
  }

  toObject() {
    return {
      uuid: this.uuid,
      page: this.page,
      comments: [{
        content: this.content
      }],
      type: pageNoteType
    };
  }
}

@Injectable()
export class AnnotationService {

  private annotationSet: any;

  constructor(private httpClient: HttpClient,
              private sessionService: SessionService,
              private appConfig: AppConfig) {
  }

  getNotes(url): Promise<Note[]> {
    return new Promise((resolve, reject) => {
      const httpOptions = this.getHttpOptions();
      const annoUrl = `${this.appConfig.getAnnotationUrl()}/find-all-by-document-url?url=${url}`;
      this.httpClient.get<any>(annoUrl, httpOptions).subscribe(response => {
        if (response._embedded && response._embedded.annotationSets && response._embedded.annotationSets.length) {
          resolve(this.extractNotes(response));
        } else {
          this.annotationSet = {
            documentUri: url,
            annotations: []
          };
          resolve(new Array<Note>());
        }
      }, reject);
    });
  }

  saveNotes(notes: Note[]) {
    // filter page notes out of existing annotations and add all new ones with content
    this.annotationSet.annotations =
      this.annotationSet.annotations
        .filter(annotation => annotation.type !== pageNoteType)
        .concat(notes
          .filter(note => note.content)
          .map(note => note.toObject()));

    return new Promise((resolve, reject) => {
      // If we have a UUID then we update, if not then we're adding a new set
      if (!this.annotationSet.uuid) {
        this.httpClient.post<any>(this.appConfig.getAnnotationUrl(), this.annotationSet, this.getHttpOptions())
          .subscribe(resolve, reject);
      } else {
        const updateUrl = `${this.appConfig.getAnnotationUrl()}/${this.annotationSet.uuid}`;
        this.httpClient.put<any>(updateUrl, this.annotationSet, this.getHttpOptions())
          .subscribe(resolve, reject);
      }
    });
  }

  private extractNotes(response) {
    this.annotationSet = response._embedded.annotationSets[0];
    const notes = this.annotationSet.annotations
      .filter(a => a.type === pageNoteType) // only page notes
      .sort((a, b) => a.page - b.page) // order by page
      .map(annotation => {
        return new Note(annotation.comments[0].content, annotation.uuid, annotation.page);
      });
    return notes;
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.sessionService.getSession().token}`,
        'Accept': 'application/json'
      })
    };
  }
}
