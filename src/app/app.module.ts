import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {IdamGuard} from './auth/idam.guard';

import { AppComponent } from './app.component';
import { DmViewerComponent } from './dm-viewer/dm-viewer.component';
import { PdfViewerComponent } from './dm-viewer/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {AppConfig} from './app.config';
import {Http, HttpModule} from '@angular/http';
import {WindowService} from './utils/window.service';
import {DocumentService} from './utils/document.service';
import {CookieService} from 'angular2-cookie/core';
import {SessionService} from './auth/session.service';

const appRoutes: Routes = [
  { path: ':url', canActivate: [IdamGuard], component: DmViewerComponent },
  { path: '', canActivate: [IdamGuard], component: DmViewerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DmViewerComponent,
    PdfViewerComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
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
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
