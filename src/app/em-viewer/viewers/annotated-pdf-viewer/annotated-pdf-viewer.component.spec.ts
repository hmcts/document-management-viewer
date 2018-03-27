import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PdfViewerModule} from 'ng2-pdf-viewer';
import {AnnotatedPdfViewerComponent} from './annotated-pdf-viewer.component';
import {AnnotationsService} from './annotations.service';
import {EmStorageAdapterService} from './em-storage-adapter.service';
import {PdfViewerComponent} from '../pdf-viewer/pdf-viewer.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UrlFixerService} from '../../../utils/url-fixer.service';
import {DebugElement} from '@angular/core';

// import * as testServer from '../../../../../bin/test/test-app.js';

describe('AnnotatedPdfViewerComponent', () => {
  let component: AnnotatedPdfViewerComponent;
  let fixture: ComponentFixture<AnnotatedPdfViewerComponent>;
  let httpMock: HttpTestingController;
  let element: DebugElement;

  // beforeAll(() => {
  //   testServer.server.listen(testServer.port);
  // });
  //
  // afterAll(() => {
  //   testServer.server.close();
  // });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PdfViewerModule, HttpClientTestingModule],
      declarations: [ AnnotatedPdfViewerComponent, PdfViewerComponent ],
      providers: [AnnotationsService, EmStorageAdapterService, UrlFixerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    httpMock = TestBed.get(HttpTestingController);
    fixture = TestBed.createComponent(AnnotatedPdfViewerComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    component.url = 'http://instructure.github.io/pdf-annotate.js/example.pdf';
    component.originalUrl = 'http://test.com/documents/uuid';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when pdf is loaded', () => {
    const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    beforeEach((done) => {
      component.rendered.subscribe(done);
    });

    it('should have 4 pages', () => {
      expect(component.numPages).toBe(14);
    });

    it('should set page to 1', () => {
      expect(component.page).toBe(1);
    });

    describe('and annotations are loaded', () => {
      beforeEach(async(() => {
        const req = httpMock.expectOne(`/demproxy/an/annotation-sets/filter?url=http://test.com/documents/uuid`);
        req.flush({
          '_embedded' : {
            'annotationSets' : [ {
              'uuid' : 'd53ae407-aec9-45ba-9d67-96b755fd85c9',
              'createdBy' : '12',
              'lastModifiedBy' : '12',
              'modifiedOn' : '2018-03-26T08:44:00.161+0000',
              'createdOn' : '2018-03-26T08:44:00.161+0000',
              'documentUri' : 'http://localhost:3621/documents/c14b9d0d-f9d2-4aef-b260-d54c156fcf01',
              'annotations' : [ {
                'createdBy' : '12',
                'lastModifiedBy' : '12',
                'modifiedOn' : '2018-03-27T10:24:07.102+0000',
                'createdOn' : '2018-03-27T10:24:07.102+0000',
                'type' : 'highlight',
                'page' : 1,
                'comments' : [ ],
                'colour' : 'FFFF00',
                'lines' : [ ],
                'rectangles' : [ {
                  'height' : 46,
                  'width' : 58,
                  'pointX' : 283,
                  'pointY' : 570,
                  'y' : 570,
                  'x' : 283
                } ],
                '_links' : {
                  'self' : {
                    'href' : 'http://localhost:3621/annotation-sets/d53ae407-aec9-45ba-9d67-96b755fd85c9/annotations/' +
                      '1badb8e3-4888-4477-8543-9f390ad30ea7'
                  },
                  'annotation-set' : {
                    'href' : 'http://localhost:3621/annotation-sets/d53ae407-aec9-45ba-9d67-96b755fd85c9'
                  }
                }
              }],
              '_links' : {
                'self' : {
                  'href' : 'http://localhost:3621/annotation-sets/d53ae407-aec9-45ba-9d67-96b755fd85c9'
                },
                'add-annotation' : {
                  'href' : 'http://localhost:3621/annotation-sets/d53ae407-aec9-45ba-9d67-96b755fd85c9/annotations/'
                }
              }
            } ]
          },
          '_links' : {
            'self' : {
              'href' : 'http://localhost:3621/annotation-sets/filter?page=0&size=5&sort=createdOn,desc'
            }
          },
          'page' : {
            'size' : 5,
            'totalElements' : 1,
            'totalPages' : 1,
            'number' : 0
          }
        });
      }));

      it('should have annotations', () => {
        expect(element.nativeElement.querySelectorAll('g[data-pdf-annotate-type="highlight"]').length)
          .toBe(1);
      });
    });

    describe('and we have no existing annotations', () => {
      beforeEach(async(() => {
        const getReq = httpMock.expectOne(`/demproxy/an/annotation-sets/filter?url=http://test.com/documents/uuid`);
        getReq.flush({
          'page' : {
            'size' : 5,
            'totalElements' : 0,
            'totalPages' : 1,
            'number' : 0
          }
        });
      }));

      beforeEach(async(() => {
        const postReq = httpMock.expectOne(`/demproxy/an/annotation-sets`);
        postReq.flush({
          'uuid' : 'd53ae407-aec9-45ba-9d67-96b755fd85c9',
          'createdBy' : '12',
          'lastModifiedBy' : '12',
          'modifiedOn' : '2018-03-26T08:44:00.161+0000',
          'createdOn' : '2018-03-26T08:44:00.161+0000',
          'documentUri' : 'http://localhost:3621/documents/c14b9d0d-f9d2-4aef-b260-d54c156fcf01',
          'annotations' : [],
          '_links' : {
            'self' : {
              'href' : 'http://localhost:3621/annotation-sets/d53ae407-aec9-45ba-9d67-96b755fd85c9'
            },
            'add-annotation' : {
              'href' : 'http://localhost:3621/annotation-sets/d53ae407-aec9-45ba-9d67-96b755fd85c9/annotations/'
            }
          }
        });
      }));

      it('should have no annotations', () => {
        expect(element.nativeElement.querySelectorAll('g[data-pdf-annotate-type="highlight"]').length)
          .toBe(0);
      });
    });

    xdescribe('when I click highlight', () => {
      beforeEach(() => {
        element.nativeElement.querySelector('button[data-tooltype="highlight"]').click();
      });
    });

  });
});
