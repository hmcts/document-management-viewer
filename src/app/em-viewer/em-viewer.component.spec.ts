import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmViewerComponent} from './em-viewer.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';
import {DmViewerModule} from './em-viewer.module';

const url = 'http://api-gateway.dm.com/documents/1234-1234-1234';

describe('DmViewerComponent', () => {
  let component: EmViewerComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<EmViewerComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    const testingModule = TestBed.configureTestingModule({
      imports: [DmViewerModule, HttpClientTestingModule]
    });

    testingModule.compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(EmViewerComponent);
    component = fixture.componentInstance;
    component.url = url;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('when the mime type is an image', () => {
    beforeEach(() => {
      const req = httpMock.expectOne(url);
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
      expect(element.nativeElement.querySelector('h1').textContent).toEqual('image.jpeg');
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
      const req = httpMock.expectOne(url);
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
      expect(element.nativeElement.querySelector('h1').textContent).toEqual('cert.pdf');
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
      const req = httpMock.expectOne(url);
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
      expect(element.nativeElement.querySelector('h1').textContent).toEqual('plain.txt');
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
      const req = httpMock.expectOne(url);
      const mockErrorResponse = {
        status: 404, statusText: 'Not Found'
      };
      const data = 'Invalid request parameters';
      req.flush(data, mockErrorResponse);
      fixture.detectChanges();
    });

    it('should display an error with the status', () => {
      expect(element.nativeElement.querySelector('.error-summary').textContent).toContain('404');
    });

    it('img element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-img-viewer')).not.toBeTruthy();
    });

    it('pdf element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer')).not.toBeTruthy();
    });

  });

});