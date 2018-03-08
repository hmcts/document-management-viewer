import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {AppConfig} from './app.config';
import {EmViewerRouteComponent} from './em-viewer/em-viewer-route.component';
import {EmAnnotationSummaryRouteComponent} from './em-annotation-summary/em-annotation-summary-route.component';
import {DmViewerModule} from './em-viewer/em-viewer.module';
import {EmAnnotationSummaryModule} from './em-annotation-summary/em-annotation-summary.module';

const appRoutes: Routes = [
  {path: 'summary', component: EmAnnotationSummaryRouteComponent},
  {path: '', component: EmViewerRouteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EmViewerRouteComponent,
    EmAnnotationSummaryRouteComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    DmViewerModule,
    EmAnnotationSummaryModule,
    BrowserModule
  ],
  providers: [
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: AppConfig) => () => config.load(),
      deps: [AppConfig],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
