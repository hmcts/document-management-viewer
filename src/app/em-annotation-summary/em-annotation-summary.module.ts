import {APP_INITIALIZER, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CookieModule} from 'ngx-cookie';
import {AppConfig} from '../app.config';
import {SessionService} from '../auth/session.service';
import {EmAnnotationSummaryComponent} from '../em-annotation-summary/em-annotation-summary.component';
import {AnnotationService} from '../dm-viewer/annotations/annotation.service';

@NgModule({
  declarations: [
    EmAnnotationSummaryComponent,
  ],
  exports: [EmAnnotationSummaryComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CookieModule.forRoot()
  ],
  providers: [
    SessionService,
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
export class EmAnnotationSummaryModule {
}
