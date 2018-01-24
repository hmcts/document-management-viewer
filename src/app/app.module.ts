import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import {IdamGuard} from './auth/idam.guard';

import { AppComponent } from './app.component';
import { DmViewerComponent } from './dm-viewer/dm-viewer.component';
import { ViewerAnchorDirective} from './dm-viewer/viewer-anchor.directive';
import { PdfViewerComponent } from './dm-viewer/pdf-viewer/pdf-viewer.component';
import { ImgViewerComponent } from './dm-viewer/img-viewer/img-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {AppConfig} from './app.config';
import {Http, HttpModule} from '@angular/http';
import {WindowService} from './utils/window.service';
import {DocumentService} from './utils/document.service';
import {CookieService} from 'angular2-cookie/core';
import {SessionService} from './auth/session.service';
import { UnsupportedViewerComponent } from './dm-viewer/unsupported-viewer/unsupported-viewer.component';
import {ViewerFactoryService} from './dm-viewer/viewer-factory.service';
import { NotesComponent } from './dm-viewer/notes/notes.component';
import {ImagePipe} from './utils/image-pipe';

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
    HttpModule
  ],
  providers: [
    IdamGuard,
    WindowService,
    DocumentService,
    SessionService,
    CookieService,
    ViewerFactoryService,
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
