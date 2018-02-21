import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import {IdamGuard} from './auth/idam.guard';

import { AppComponent } from './app.component';
import { DmViewerComponent } from './dm-viewer/dm-viewer.component';
import { ViewerAnchorDirective} from './dm-viewer/viewers/viewer-anchor.directive';
import { PdfViewerComponent } from './dm-viewer/viewers/pdf-viewer/pdf-viewer.component';
import { ImgViewerComponent } from './dm-viewer/viewers/img-viewer/img-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {AppConfig} from './app.config';
import {Http, HttpModule} from '@angular/http';
import {WindowService} from './utils/window.service';
import {DocumentService} from './utils/document.service';
import {CookieModule, CookieService} from 'ngx-cookie';
import {SessionService} from './auth/session.service';
import { UnsupportedViewerComponent } from './dm-viewer/viewers/unsupported-viewer/unsupported-viewer.component';
import {ViewerFactoryService} from './dm-viewer/viewers/viewer-factory.service';
import { NotesComponent } from './dm-viewer/annotations/notes/notes.component';
import {ImagePipe} from './utils/image-pipe';
import {AnnotationService} from './dm-viewer/annotations/annotation.service';
import {CookieOptionsProvider} from 'ngx-cookie/src/cookie-options-provider';

const appRoutes: Routes = [
  { path: ':url', canActivate: [IdamGuard], component: DmViewerComponent },
  { path: '', canActivate: [IdamGuard], component: DmViewerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DmViewerComponent,
    PdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent,
    ViewerAnchorDirective,
    NotesComponent,
    ImagePipe
  ],
  entryComponents: [
    PdfViewerComponent,
    ImgViewerComponent,
    UnsupportedViewerComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PdfViewerModule,
    HttpModule,
    CookieModule.forRoot()
  ],
  providers: [
    IdamGuard,
    WindowService,
    DocumentService,
    SessionService,
    ViewerFactoryService,
    AnnotationService,
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
