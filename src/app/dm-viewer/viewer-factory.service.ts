import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import { PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import { ImgViewerComponent} from './img-viewer/img-viewer.component';
import {Viewer} from './viewer';
import {UnsupportedViewerComponent} from './unsupported-viewer/unsupported-viewer.component';

@Injectable()
export class ViewerFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  buildViewer(documentMetaData, viewContainerRef: ViewContainerRef): ComponentRef<Viewer> {

    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(this.determineComponent(documentMetaData.mimeType));

    viewContainerRef.clear();

    let componentRef: ComponentRef<Viewer> = viewContainerRef.createComponent(componentFactory);
    (<Viewer>componentRef.instance).url = documentMetaData._links.binary.href;
    return componentRef;
  }
  private determineComponent(mimeType: string) {
    if (this.isImage(mimeType)) {
      return ImgViewerComponent;
    }
    if (this.isPdf(mimeType)) {
      return PdfViewerComponent
    }
    return UnsupportedViewerComponent;
  }

  private isImage(mimeType: String) {
    return mimeType.startsWith('image/');
  }

  private isPdf(mimeType: String) {
    return mimeType === 'application/pdf';
  }

  private isUnsupported(mimeType: String) {
    return !this.isImage(mimeType) && !this.isPdf(mimeType);
  }
}
