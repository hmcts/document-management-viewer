import {Component, Input, OnInit} from '@angular/core';
import {Viewer} from '../viewer';
import {PDFDocumentProxy} from 'ng2-pdf-viewer';
import { PDFJSStatic as PDFJS } from 'pdfjs-dist';
import * as PDFJSAnnotate from '@louisblack/pdf-annotate.js';

const { UI, LocalStoreAdapter } = PDFJSAnnotate;

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

  private RENDER_OPTIONS = {
    documentId: this.url,
    pdfDocument: null,
    scale: 1,
    rotate: 0
  };

  ngOnInit() {
  }

  pdfLoadComplete(loadedPdf: PDFDocumentProxy) {
    this.pdf = loadedPdf;
    this.numPages = loadedPdf.numPages;
    this.RENDER_OPTIONS.pdfDocument = loadedPdf;
    const localStoreAdapter = new LocalStoreAdapter();
    (<any> PDFJSAnnotate).setStoreAdapter(localStoreAdapter);
    PDFJS.getDocument(this.url).then(pdf => {
      UI.initEventListeners();
      (<any> PDFJSAnnotate).initToolbarEvents(this.RENDER_OPTIONS);
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

        UI.renderPage(this.page, this.RENDER_OPTIONS);
    }
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
