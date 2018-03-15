import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {UrlFixerService} from '../utils/url-fixer.service';

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
              private urlFixer: UrlFixerService) { }

  ngOnInit() {
    if (!this.url) {
      this.error = 'A Url is required';
    } else {
      this.http.get<any>(`${this.urlFixer.fixDm(this.url)}`, this.httpOptions())
        .subscribe(
          resp => {
            if (resp && resp._links) {
              this.docName = resp.originalDocumentName;
            }
          },
          err => {
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
    return {};
  }

  private lookForAnnotationSets(): Promise<any> {
    return new Promise((resolve, reject) => {
      const annoUrl = `/demproxy/an/annotation-sets/filter?url=${this.url}`;
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

