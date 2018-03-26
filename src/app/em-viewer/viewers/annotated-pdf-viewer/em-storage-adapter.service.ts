import {Injectable} from '@angular/core';

import * as PDFJSAnnotate from '@louisblack/pdf-annotate.js';

const { StoreAdapter } = PDFJSAnnotate;

@Injectable()
export class EmStorageAdapterService extends (StoreAdapter as { new(def: any): any; }) {

  constructor() {
    super({
      getAnnotations(documentId, pageNumber) {

      },

      getAnnotation(documentId, annotationId) {

      },

      addAnnotation(documentId, pageNumber, annotation) {

      },

      editAnnotation(documentId, annotationId, annotation) {

      },

      deleteAnnotation(documentId, annotationId) {

      },

      getComments(documentId, annotationId) {

      },

      addComment(documentId, annotationId, content) {

      },

      deleteComment(documentId, commentId) {

      }
    });
  }
}
