import {APP_INITIALIZER, NgModule} from '@angular/core';
import {EmViewerComponent} from './em-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FormsModule} from '@angular/forms';
import {CookieModule} from 'ngx-cookie';
import {AppConfig} from '../app.config';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {AnnotationService} from './annotations/annotation.service';
import {PdfViewerComponent} from './viewers/pdf-viewer/pdf-viewer.component';
import {UnsupportedViewerComponent} from './viewers/unsupported-viewer/unsupported-viewer.component';
import {NotesComponent} from './annotations/notes/notes.component';
import {ImgViewerComponent} from './viewers/img-viewer/img-viewer.component';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';
import {UrlFixerService} from '../utils/url-fixer.service';

@NgModule({
  declarations: [
    EmViewerComponent,
    PdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent,
    ViewerAnchorDirective,
    NotesComponent
  ],
  entryComponents: [
    PdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent
  ],
  exports: [EmViewerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    CookieModule.forRoot()
  ],
  providers: [
    ViewerFactoryService,
    AnnotationService,
    UrlFixerService
  ],
})
export class EmViewerModule {
}
