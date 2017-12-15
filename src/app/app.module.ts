import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { DmViewerComponent } from './dm-viewer/dm-viewer.component';
import {RouterModule, Routes} from '@angular/router';
import { PdfViewerComponent } from './dm-viewer/pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const appRoutes: Routes = [
  { path: ':url', component: DmViewerComponent }
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
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
