import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {

  @Input() url: string;
  @Input() jwt: string;
  src: any;

  constructor() { }

  ngOnInit() {
    this.src = {
      url: this.url,
      httpHeaders: {'Authorization': `${this.jwt}`}
    };
  }

}
