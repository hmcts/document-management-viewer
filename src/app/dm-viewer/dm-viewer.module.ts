import {APP_INITIALIZER, NgModule} from '@angular/core';
import {DmViewerComponent} from './dm-viewer.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import {FormsModule} from '@angular/forms';
import {CookieModule} from 'ngx-cookie';
import {WindowService} from '../utils/window.service';
import {AppConfig} from '../app.config';
import {IdamGuard} from '../auth/idam.guard';
import {DocumentService} from '../utils/document.service';
import {SessionService} from '../auth/session.service';
import {ViewerFactoryService} from './viewers/viewer-factory.service';
import {AnnotationService} from './annotations/annotation.service';
import {DmViewerRouteComponent} from './dm-viewer-route.component';
import {PdfViewerComponent} from './viewers/pdf-viewer/pdf-viewer.component';
import {UnsupportedViewerComponent} from './viewers/unsupported-viewer/unsupported-viewer.component';
import {ImagePipe} from '../utils/image-pipe';
import {NotesComponent} from './annotations/notes/notes.component';
import {EmAnnotationSummaryComponent} from '../em-annotation-summary/em-annotation-summary.component';
import {EmAnnotationSummaryRouteComponent} from '../em-annotation-summary/em-annotation-summary-route.component';
import {ImgViewerComponent} from './viewers/img-viewer/img-viewer.component';
import {ViewerAnchorDirective} from './viewers/viewer-anchor.directive';

@NgModule({
  declarations: [
    DmViewerComponent,
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
  exports: [DmViewerComponent],
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
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => () => config.load(),
      deps: [AppConfig],
      multi: true
    }
  ],
})
export class DmViewerModule {
}
