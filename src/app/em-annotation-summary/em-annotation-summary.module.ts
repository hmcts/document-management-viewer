import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppConfig} from '../app.config';
import {EmAnnotationSummaryComponent} from '../em-annotation-summary/em-annotation-summary.component';
import {AnnotationService} from '../em-viewer/annotations/annotation.service';
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
    AnnotationService,
    UrlFixerService
  ],
})
export class EmAnnotationSummaryModule {
}
