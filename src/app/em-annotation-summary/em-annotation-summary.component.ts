import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../auth/session.service';
import {AppConfig} from '../app.config';


@Component({
  selector: 'app-em-annotation-summary',
  templateUrl: './em-annotation-summary.component.html',
  styleUrls: ['./em-annotation-summary.component.scss']
})
export class EmAnnotationSummaryComponent implements OnInit {

  @Input() url: string;
  // todo make a class
  jwt: string;
  docName: string;
  error: string;
  annotationSet: any;
  annotations: any;

  constructor(private http: HttpClient,
              private sessionService: SessionService,
              private appConfig: AppConfig) { }

  ngOnInit() {
    this.jwt = this.sessionService.getSession().token;
    if (!this.jwt || !this.url) {
      // this.error = new Error('A Url & jwt token are required').message;
      this.error = 'A Url & jwt token are required';
    } else {
      this.http.get<any>(`${this.url}`, this.httpOptions())
        .subscribe(
          resp => {
            if (resp && resp._links) {
              this.docName = resp.originalDocumentName;
            }
          },
          err => {
            if (err.status === 401) {
              this.sessionService.clearSession();
              return;
            }
            this.error = err;
          });

      this.lookForAnnotationSets().then(possibleSet => {
        if (possibleSet) {
          this.annotationSet = possibleSet;
          this.annotations = possibleSet.annotations.sort((a, b) => a.page - b.page);
          // if (this.annotations.length === 0) {
          //     this.error = 'No Annotations Found';
          // }
        }
      });
    }
  }


  private httpOptions() {
    return {
      headers: new HttpHeaders({'Authorization': `Bearer ${this.jwt}`})
    };
  }

  private lookForAnnotationSets(): Promise<any> {
    return new Promise((resolve, reject) => {
      const annoUrl = `${this.appConfig.getAnnotationUrl()}/find-all-by-document-url?url=${this.url}`;
      this.http.get<any>(annoUrl, this.httpOptions()).subscribe(response => {
        if (response._embedded && response._embedded.annotationSets && response._embedded.annotationSets.length) {
          resolve(response._embedded.annotationSets[0]);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }
}

