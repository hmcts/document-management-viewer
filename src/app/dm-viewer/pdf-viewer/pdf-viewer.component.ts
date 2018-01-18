import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from '../../auth/session.service';
import {Viewer} from '../viewer';
import PDFDocumentProxy = PDF.PDFDocumentProxy;

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, Viewer {

  numPages: number;
  page = 0;
  private pdf: PDFDocumentProxy;

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

  pdfLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.numPages = pdf.numPages;
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.numPages - 1) {
      this.page ++;
    }
  }
}
