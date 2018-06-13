import {Viewer} from "../viewer";
import {Observable} from "rxjs/Observable";

export interface AnnotationsService {

  getAnnotations(documentId, pageNumber): Promise<any>;

  addAnnotation(page: number, annotation: any): Observable<any>;

  deleteAnnotation(annotationUrl: string);

}
