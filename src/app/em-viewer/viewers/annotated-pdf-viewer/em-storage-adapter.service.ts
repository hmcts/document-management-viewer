import {Injectable} from '@angular/core';

import * as PDFJSAnnotate from '@louisblack/pdf-annotate.js';
import {AnnotationsService} from './annotations.service';

const { StoreAdapter } = PDFJSAnnotate;

@Injectable()
export class EmStorageAdapterService extends (StoreAdapter as { new(def: any): any; }) {

  constructor(private annotationsService: AnnotationsService) {
    super({
      getAnnotations(documentId, pageNumber) {
        return annotationsService.getAnnotations(documentId, pageNumber);
      },

      getAnnotation(documentId, annotationId) {

      },

      addAnnotation(documentId, pageNumber, annotation) {
        return new Promise((resolve, reject) => {
          annotationsService.addAnnotation(pageNumber, annotation).subscribe(resolve, reject);
        });
      },

      editAnnotation(documentId, annotationId, annotation) {

      },

      deleteAnnotation(documentId, annotationId) {
        return new Promise((resolve, reject) => {
          annotationsService.deleteAnnotation(annotationId).subscribe(resolve, reject);
        });
      },

      getComments(documentId, annotationId) {
        return new Promise(resolve => resolve([]));
      },

      addComment(documentId, annotationId, content) {

      },

      deleteComment(documentId, commentId) {

      }
    });
  }
}
