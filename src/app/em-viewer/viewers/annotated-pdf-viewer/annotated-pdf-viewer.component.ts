import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Viewer} from '../viewer';
import {PDFDocumentProxy} from 'ng2-pdf-viewer';
import {PDFJSStatic as PDFJS} from 'pdfjs-dist';
import {EmStorageAdapterService} from './em-storage-adapter.service';
import * as PDFJSAnnotate from '@louisblack/pdf-annotate.js';

const PDFAnnotate = PDFJSAnnotate;
const { UI } = PDFJSAnnotate;

@Component({
  selector: 'app-annotated-pdf-viewer',
  templateUrl: './annotated-pdf-viewer.component.html',
  styleUrls: ['./annotated-pdf-viewer.component.scss']
})
export class AnnotatedPdfViewerComponent implements Viewer, OnInit {

  numPages: number;
  page = 1;

  private pdf: PDFDocumentProxy;

  @Input() url: string;
  @Input() originalUrl: string;
  @Output() rendered = new EventEmitter<CustomEvent>();
  @Output() pageChanged = new EventEmitter<number>();

  private RENDER_OPTIONS;

  constructor(private storageAdapter: EmStorageAdapterService) {

  }

  ngOnInit() {
    this.RENDER_OPTIONS = {
      documentId: this.originalUrl,
      pdfDocument: null,
      scale: 1,
      rotate: 0
    };
  }

  pdfLoadComplete(loadedPdf: PDFDocumentProxy) {
    this.pdf = loadedPdf;
    this.numPages = loadedPdf.numPages;
    this.RENDER_OPTIONS.pdfDocument = loadedPdf;
    PDFAnnotate.setStoreAdapter(this.storageAdapter);
    PDFJS.getDocument(this.url).then(pdf => {
      UI.initEventListeners();
      PDFAnnotate.initToolbarEvents(this.RENDER_OPTIONS);
    });
  }

  pageRendered(e: CustomEvent) {
    if (this.pdf) {
      const PAGE = document.getElementsByClassName('page').item(0);
        PAGE.setAttribute('id', `pageContainer${this.page}`);
        const annotationLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        annotationLayer.setAttribute('class', 'annotationLayer');
        const textLayer = document.getElementsByClassName('textLayer').item(0);
        PAGE.insertBefore(annotationLayer, textLayer);

        this.renderAnnotations();
        this.rendered.emit(e);
    }
  }

  public renderAnnotations() {
    UI.renderPage(this.page, this.RENDER_OPTIONS);
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.pageChange(this.page);
    }
  }

  nextPage() {
    if (this.page < this.numPages) {
      this.page++;
      this.pageChange(this.page);
    }
  }

  pageChange(value: number) {
    this.pageChanged.emit(value);
  }
}
