import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import { PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import { ImgViewerComponent} from './img-viewer/img-viewer.component';
import {Viewer} from './viewer';
import {UnsupportedViewerComponent} from './unsupported-viewer/unsupported-viewer.component';
import {UrlFixerService} from '../../utils/url-fixer.service';

@Injectable()
export class ViewerFactoryService {

  private static determineComponent(mimeType: string) {
    if (ViewerFactoryService.isImage(mimeType)) {
      return ImgViewerComponent;
    }
    if (ViewerFactoryService.isPdf(mimeType)) {
      return PdfViewerComponent;
    }
    return UnsupportedViewerComponent;
  }

  private static isImage(mimeType: String) {
    return mimeType.startsWith('image/');
  }

  private static isPdf(mimeType: String) {
    return mimeType === 'application/pdf';
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private urlFixer: UrlFixerService) { }

  buildViewer(documentMetaData, viewContainerRef: ViewContainerRef) {
    const componentToBuild =
      ViewerFactoryService.determineComponent(documentMetaData.mimeType);
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componentToBuild);

    viewContainerRef.clear();

    const componentRef: ComponentRef<Viewer> = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.url = this.urlFixer.fixDm(documentMetaData._links.binary.href);
    return componentRef.instance;
  }

}
