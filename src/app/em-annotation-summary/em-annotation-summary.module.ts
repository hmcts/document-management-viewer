import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppConfig} from '../app.config';
import {EmAnnotationSummaryComponent} from '../em-annotation-summary/em-annotation-summary.component';
import {NotesService} from '../em-viewer/annotations/notes.service';
import {UrlFixerService} from '../utils/url-fixer.service';

@NgModule({
  declarations: [
    EmAnnotationSummaryComponent,
  ],
  exports: [EmAnnotationSummaryComponent],
  imports: [
    BrowserModule,
    HttpClientModule],
  providers: [
    NotesService,
    UrlFixerService
  ],
})
export class EmAnnotationSummaryModule {
}
