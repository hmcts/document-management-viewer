import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Viewer} from '../viewer';
import {PDFDocumentProxy} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit, Viewer {

  @Input() numPages: number;
  @Input() page = 1;
  private pdf: PDFDocumentProxy;

  @Input() url: string;
  @Output() afterLoadComplete = new EventEmitter<PDFDocumentProxy>();
  @Output() pageRendered = new EventEmitter<CustomEvent>();

  src: any;

  constructor() { }

  ngOnInit() {
    this.src = {
      url: this.url,
    };
  }

  afterPdfLoadComplete(pdf: PDFDocumentProxy) {
    console.log('(pdfLoadComplete)');
    this.pdf = pdf;
    this.numPages = pdf.numPages;
    this.afterLoadComplete.emit(pdf);
  }

  afterPageRendered(e: CustomEvent) {
    this.pageRendered.emit(e);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage() {
    if (this.page < this.numPages) {
      this.page++;
    }
  }
}
