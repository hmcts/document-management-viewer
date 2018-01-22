import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmViewerComponent } from './dm-viewer.component';
import { PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {SessionService} from '../auth/session.service';
import {AppModule} from '../app.module';
import {CookieService} from 'angular2-cookie/core';
import {ImgViewerComponent} from './img-viewer/img-viewer.component';
import {ViewerAnchorDirective} from './viewer-anchor.directive';
import {UnsupportedViewerComponent} from './unsupported-viewer/unsupported-viewer.component';
import {ViewerFactoryService} from './viewer-factory.service';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {NotesComponent} from './notes/notes.component';
import {FormsModule} from '@angular/forms';
import {WindowService} from '../utils/window.service';

const url = 'http://api-gateway.dm.com/documents/1234-1234-1234';
const jwt = '12345';

describe('DmViewerComponent', () => {
  let component: DmViewerComponent;
  let httpMock: HttpTestingController;
  let sessionService: SessionService;
  let fixture: ComponentFixture<DmViewerComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    const testingModule = TestBed.configureTestingModule({
      imports: [PdfViewerModule, HttpClientTestingModule, FormsModule],
      declarations: [
        DmViewerComponent,
        PdfViewerComponent,
        ImgViewerComponent,
        NotesComponent,
        UnsupportedViewerComponent,
        ViewerAnchorDirective],
      providers: [SessionService, CookieService, ViewerFactoryService, WindowService]
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [PdfViewerComponent, ImgViewerComponent, UnsupportedViewerComponent]
      }
    });

    testingModule.compileComponents();
  }));

  beforeEach(() => {
    sessionService = TestBed.get(SessionService);
    sessionService.createSession({
      token: jwt
    });
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(DmViewerComponent);
    component = fixture.componentInstance;
    component.url = url;
    component.jwt = jwt;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('when the mime type is an image', () => {
    beforeEach(() => {
      const req = httpMock.expectOne(`${url}?jwt=${jwt}`);
      req.flush({
        mimeType: 'image/jpeg',
        originalDocumentName: 'image.jpeg',
        _links: {
          binary: {
            href: `${url}/binary`
          }
        }
      });
      fixture.detectChanges();
    });

    it('should display document name', () => {
      expect(element.nativeElement.querySelector('h2').textContent).toEqual('image.jpeg');
    });

    it('img element should be visible', () => {
      expect(element.nativeElement.querySelector('app-img-viewer')).toBeTruthy();
    });

    it('and pdf element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer')).not.toBeTruthy();
    });
  });

  describe('when the mime type is pdf', () => {
    beforeEach(() => {
      const req = httpMock.expectOne(`${url}?jwt=${jwt}`);
      req.flush({
        mimeType: 'application/pdf',
        originalDocumentName: 'cert.pdf',
        _links: {
          binary: {
            href: `${url}/binary`
          }
        }
      });
      fixture.detectChanges();
    });

    it('should display document name', () => {
      expect(element.nativeElement.querySelector('h2').textContent).toEqual('cert.pdf');
    });

    it('img element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-img-viewer')).not.toBeTruthy();
    });

    it('pdf element should be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer')).toBeTruthy();
    });
  });

  describe('when the mime type is unsupported', () => {
    beforeEach(() => {
      const req = httpMock.expectOne(`${url}?jwt=${jwt}`);
      req.flush({
        mimeType: 'text/plain',
        originalDocumentName: 'plain.txt',
        _links: {
          binary: {
            href: `${url}/binary`
          }
        }
      });
      fixture.detectChanges();
    });

    it('should display document name', () => {
      expect(element.nativeElement.querySelector('h2').textContent).toEqual('plain.txt');
    });

    it('should show a message with link to download', () => {
      expect(element.nativeElement.querySelector('p').innerHTML)
        .toContain(`${url}/binary`);
    });

    it('img element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-img-viewer')).not.toBeTruthy();
    });

    it('pdf element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer')).not.toBeTruthy();
    });
  });

  describe('when the server returns an error', () => {
    beforeEach(() => {
      const req = httpMock.expectOne(`${url}?jwt=${jwt}`);
      const mockErrorResponse = {
        status: 404, statusText: 'Not Found'
      };
      const data = 'Invalid request parameters';
      req.flush(data, mockErrorResponse);
      fixture.detectChanges();
    });

    it('should display an error with the status', () => {
      expect(element.nativeElement.querySelector('.error-message').textContent).toContain('404');
    });

    it('img element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-img-viewer')).not.toBeTruthy();
    });

    it('pdf element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer')).not.toBeTruthy();
    });

  });

});
