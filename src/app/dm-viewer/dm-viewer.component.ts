import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SessionService} from '../auth/session.service';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {Viewer} from './viewers/viewer';

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
  mimeType: string;
  docName: string;
  viewerComponent: Viewer;
  error: string;

  constructor(private http: HttpClient,
              private viewerFactoryService: ViewerFactoryService) { }

  ngOnInit() {
    if (!this.url) {
      throw new Error('url is a required arguments');
    }
    this.http.get<any>(`${this.url}`, {})
      .subscribe(
        resp => {
          if (resp && resp._links) {
            this.docName = resp.originalDocumentName;
            this.viewerComponent =
              this.viewerFactoryService.buildViewer(resp, this.viewerAnchor.viewContainerRef);
          }
        },
        err => {
          this.error = err;
        });
  }
}
