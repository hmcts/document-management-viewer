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

const url = 'http://api-gateway.dm.com/documents/1234-1234-1234';
const jwt = '12345';

describe('DmViewerComponent', () => {
  let component: DmViewerComponent;
  let httpMock: HttpTestingController;
  let sessionService: SessionService;
  let fixture: ComponentFixture<DmViewerComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PdfViewerModule, HttpClientTestingModule],
      declarations: [ DmViewerComponent, PdfViewerComponent, ImgViewerComponent ],
      providers: [SessionService, CookieService]
    })
    .compileComponents();
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
});
