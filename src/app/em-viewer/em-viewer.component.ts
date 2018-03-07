import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {Viewer} from './viewers/viewer';

@Component({
  selector: 'app-em-viewer',
  templateUrl: './em-viewer.component.html',
  styleUrls: ['./em-viewer.component.scss']
})
export class EmViewerComponent implements OnInit {

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
