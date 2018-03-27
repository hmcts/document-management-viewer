import {NgModule} from '@angular/core';
import {EmViewerComponent} from './em-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FormsModule} from '@angular/forms';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {NotesService} from './annotations/notes.service';
import {PdfViewerComponent} from './viewers/pdf-viewer/pdf-viewer.component';
import {UnsupportedViewerComponent} from './viewers/unsupported-viewer/unsupported-viewer.component';
import {NotesComponent} from './annotations/notes/notes.component';
import {ImgViewerComponent} from './viewers/img-viewer/img-viewer.component';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {UrlFixerService} from '../utils/url-fixer.service';
import {AnnotatedPdfViewerComponent} from './viewers/annotated-pdf-viewer/annotated-pdf-viewer.component';
import {EmStorageAdapterService} from './viewers/annotated-pdf-viewer/em-storage-adapter.service';
import {AnnotationsService} from './viewers/annotated-pdf-viewer/annotations.service';

@NgModule({
  declarations: [
    EmViewerComponent,
    AnnotatedPdfViewerComponent,
    PdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent,
    ViewerAnchorDirective,
    NotesComponent
  ],
  entryComponents: [
    PdfViewerComponent,
    AnnotatedPdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent
  ],
  exports: [EmViewerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule],
  providers: [
    ViewerFactoryService,
    NotesService,
    UrlFixerService,
    EmStorageAdapterService,
    AnnotationsService
  ],
})
export class EmViewerModule {
}
