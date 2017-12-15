import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmViewerComponent } from './dm-viewer.component';
import { PdfViewerComponent} from './pdf-viewer/pdf-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {DebugElement} from '@angular/core';

const url = 'http://api-gateway.dm.com/documents/1234-1234-1234';
const jwt = '12345';

describe('DmViewerComponent', () => {
  let component: DmViewerComponent;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<DmViewerComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PdfViewerModule, HttpClientTestingModule],
      declarations: [ DmViewerComponent, PdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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
      expect(element.nativeElement.querySelector('h2[data-hook="dm.viewer.docName"').textContent).toEqual('image.jpeg');
    });

    it('should use an img tag', () => {
      expect(element.nativeElement.querySelector('img[data-hook="dm.viewer.img"')).toBeTruthy();
    });

    it('and pdf element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer[data-hook="dm.viewer.pdf"')).not.toBeTruthy();
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
      expect(element.nativeElement.querySelector('h2[data-hook="dm.viewer.docName"').textContent).toEqual('cert.pdf');
    });

    it('should not use an img tag', () => {
      expect(element.nativeElement.querySelector('img[data-hook="dm.viewer.img"')).not.toBeTruthy();
    });

    it('pdf element should be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer[data-hook="dm.viewer.pdf"')).toBeTruthy();
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
      expect(element.nativeElement.querySelector('h2[data-hook="dm.viewer.docName"').textContent).toEqual('plain.txt');
    });

    it('should show a message with link to download', () => {
      expect(element.nativeElement.querySelector('p[data-hook="dm.viewer.unsupported"').innerHTML)
        .toContain(`${url}/binary`);
    });

    it('should not use an img tag', () => {
      expect(element.nativeElement.querySelector('img[data-hook="dm.viewer.img"')).not.toBeTruthy();
    });

    it('pdf element should not be visible', () => {
      expect(element.nativeElement.querySelector('app-pdf-viewer[data-hook="dm.viewer.pdf"')).not.toBeTruthy();
    });
  });
});
