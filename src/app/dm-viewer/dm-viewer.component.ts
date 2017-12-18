import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../auth/session.service';

@Component({
  selector: 'app-dm-viewer',
  templateUrl: './dm-viewer.component.html',
  styleUrls: ['./dm-viewer.component.scss']
})
export class DmViewerComponent implements OnInit {

  @Input() url: string;
  // todo make a class
  jwt: string;
  mimeType: string;
  binaryUrl: string;
  docName: string;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  ngOnInit() {
    this.jwt = this.sessionService.getSession().token;
    if (!this.url || !this.jwt) {
      throw new Error('url and jwt token are required arguments');
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.jwt}` })
    };
    this.http.get<any>(`${this.url}?jwt=${this.jwt}`, httpOptions)
      .subscribe(resp => {
        if (resp && resp._links) {
          this.mimeType = resp.mimeType;
          this.docName = resp.originalDocumentName;
          this.binaryUrl = resp._links.binary.href;
        }
      });
  }

  isImage(mimeType: String) {
    return mimeType.startsWith('image/');
  }

  isPdf(mimeType: String) {
    return mimeType === 'application/pdf';
  }

  isUnsupported(mimeType: String) {
    return !this.isImage(mimeType) && !this.isPdf(mimeType);
  }
}
