import {Injectable} from "@angular/core";

import * as PDFJSAnnotate from '@louisblack/pdf-annotate.js';

const { StoreAdapter } = PDFJSAnnotate;


@Injectable()
export class EmStorageAdapterService extends StoreAdapter {


}
