import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// import {UrlFixerService} from "../../../utils/url-fixer.service";

@Injectable()
export class AnnotationsService {

  private annotationSet: any;

  constructor(private httpClient: HttpClient) {
  }

  getAnnotations(url, page): Promise<any[]> {
    return this.lookForAnnotationSets(url).then(possibleSet => {
      if (possibleSet) {
        this.annotationSet = possibleSet;
        return this.extractNotes(possibleSet, page);
      }
      return this.initiateNewSet(url);
    });
  }

  private lookForAnnotationSets(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const httpOptions = this.getHttpOptions();
      const annoUrl = `/demproxy/an/annotation-sets/filter?url=${url}`;
      this.httpClient.get<any>(annoUrl, httpOptions).subscribe(response => {
        if (response._embedded && response._embedded.annotationSets && response._embedded.annotationSets.length) {
          resolve(response._embedded.annotationSets[0]);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }

  private extractNotes(set, page) {
    return set.annotations
      .filter(a => a.type !== 'PAGENOTE' && a.page === page) // only non page notes
  }

  private initiateNewSet(url: string) {
    return new Promise((resolve, reject) => {
      const body = {
        documentUri: url,
        annotations: [],
      };
      this.httpClient.post('/demproxy/an/annotation-sets', body, this.getHttpOptions()).subscribe(response => {
          this.annotationSet = response;
          resolve([]);
        },
        reject);
    });
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
  }

}
