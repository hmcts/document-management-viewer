import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../auth/session.service';
import {ViewerAnchorDirective} from './viewer-anchor.directive';
import {ViewerFactoryService} from './viewer-factory.service';
import {Viewer} from './viewer';

@Component({
  selector: 'app-dm-viewer',
  templateUrl: './dm-viewer.component.html',
  styleUrls: ['./dm-viewer.component.scss']
})
export class DmViewerComponent implements OnInit {

  @ViewChild(ViewerAnchorDirective) viewerAnchor: ViewerAnchorDirective;
  @Input() url: string;
  @Input() annotate: boolean;
  // todo make a class
  jwt: string;
  mimeType: string;
  docName: string;
  viewerComponent: Viewer;
  error: string;

  constructor(private http: HttpClient,
              private sessionService: SessionService,
              private viewerFactoryService: ViewerFactoryService) { }

  ngOnInit() {
    this.jwt = this.sessionService.getSession().token;
    if (!this.url || !this.jwt) {
      throw new Error('url and jwt token are required arguments');
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${this.jwt}` })
    };
    this.http.get<any>(`${this.url}?jwt=${this.jwt}`, httpOptions)
      .subscribe(
        resp => {
          if (resp && resp._links) {
            this.docName = resp.originalDocumentName;
            this.viewerComponent =
              this.viewerFactoryService.buildViewer(resp, this.viewerAnchor.viewContainerRef);
          }
        },
        err => {
          if (err.status === 401) {
            this.sessionService.clearSession();
            return;
          }
          this.error = err;
        });
  }
}
