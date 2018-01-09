import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from '../../auth/session.service';
import {Viewer} from '../viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, Viewer {

  @Input() url: string;
  src: any;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    const jwt = this.sessionService.getSession().token;
    this.src = {
      url: this.url,
      httpHeaders: {'Authorization': `${jwt}`}
    };
  }

}
