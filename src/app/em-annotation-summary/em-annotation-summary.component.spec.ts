import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EmAnnotationSummaryComponent} from './em-annotation-summary.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CookieModule} from 'ngx-cookie';
import {DebugElement} from '@angular/core';
import {EmAnnotationSummaryModule} from './em-annotation-summary.module';

const documentUrl = 'http://api-gateway.dm.com/documents/1234-1234-1234';
const annotationUrl = '';
const findAnnotationUrl = annotationUrl + '/find-all-by-document-url?url=' + documentUrl;

const configObject = {
  'annotation_url' : annotationUrl
};

const annotationSetObject = {
  _embedded: {
    annotationSets: [{
      uuid: 'd3782d64-c9b3-48f0-a44a-9de7f1dd9b35',
      createdBy: '350',
      lastModifiedBy: '350',
      modifiedOn: '2018-02-27T11:15:45.990+0000',
      createdOn: '2018-02-27T11:15:45.990+0000',
      documentUri: 'http://localhost:3603/documents/dab86fd7-702e-4a09-bdeb-cc504c771b49',
      annotations: [{
        createdBy: '350',
        lastModifiedBy: '350',
        modifiedOn: '2018-02-27T11:40:00.363+0000',
        createdOn: '2018-02-27T11:40:00.363+0000',
        type: 'PAGENOTE',
        page: 0,
        comments: [{
          content: 'I am some test Text'
        }],
      }]
    }],
    page: {
      size: 5,
      totalElements: 1,
      totalPages: 1,
      number: 0
    }
  }
};

const annotationsObject = [{
  createdBy: '350',
  lastModifiedBy: '350',
  modifiedOn: '2018-02-27T11:40:00.363+0000',
  createdOn: '2018-02-27T11:40:00.363+0000',
  type: 'PAGENOTE',
  page: 0,
  comments: [{
    content: 'I am some test Text'
  }]
}];

const annotationSet4Object = {
  _embedded: {
    annotationSets: [{
      uuid: 'd3782d64-c9b3-48f0-a44a-9de7f1dd9b35',
      createdBy: '350',
      lastModifiedBy: '350',
      modifiedOn: '2018-02-27T11:15:45.990+0000',
      createdOn: '2018-02-27T11:15:45.990+0000',
      documentUri: 'http://localhost:3603/documents/dab86fd7-702e-4a09-bdeb-cc504c771b49',
      annotations: [{
        createdBy: '350',
        lastModifiedBy: '350',
        modifiedOn: '2018-02-27T11:40:00.363+0000',
        createdOn: '2018-02-27T11:40:00.363+0000',
        type: 'PAGENOTE',
        page: 0,
        comments: [ {
          createdBy: '350',
          lastModifiedBy: '350',
          modifiedOn: '2018-02-27T11:40:00.363+0000',
          createdOn: '2018-02-27T11:40:00.363+0000',
          type: 'PAGENOTE',
          page: 0,
          comments: [{
            content: 'I am some test Text 0'
          }]},
          {
            createdBy: '350',
            lastModifiedBy: '350',
            modifiedOn: '2018-02-27T11:40:00.363+0000',
            createdOn: '2018-02-27T11:40:00.363+0000',
            type: 'PAGENOTE',
            page: 2,
            comments: [{
              content: 'I am some test Text 2'
            }]},
          {
            createdBy: '350',
            lastModifiedBy: '350',
            modifiedOn: '2018-02-27T11:40:00.363+0000',
            createdOn: '2018-02-27T11:40:00.363+0000',
            type: 'PAGENOTE',
            page: 1,
            comments: [{
              content: 'I am some test Text 1'
            }]},
          {
            createdBy: '350',
            lastModifiedBy: '350',
            modifiedOn: '2018-02-27T11:40:00.363+0000',
            createdOn: '2018-02-27T11:40:00.363+0000',
            type: 'PAGENOTE',
            page: 5,
            comments: [{
              content: 'I am some test Text 5'
            }]
          }],
      }]
    }],
    page: {
      size: 5,
      totalElements: 1,
      totalPages: 1,
      number: 0
    }
  }
};

const annotations4Object = [
  {
    createdBy: '350',
    lastModifiedBy: '350',
    modifiedOn: '2018-02-27T11:40:00.363+0000',
    createdOn: '2018-02-27T11:40:00.363+0000',
    type: 'PAGENOTE',
    page: 0,
    comments: [{
      content: 'I am some test Text 0'
    }]},
  {
    createdBy: '350',
    lastModifiedBy: '350',
    modifiedOn: '2018-02-27T11:40:00.363+0000',
    createdOn: '2018-02-27T11:40:00.363+0000',
    type: 'PAGENOTE',
    page: 2,
    comments: [{
      content: 'I am some test Text 2'
    }]},
  {
    createdBy: '350',
    lastModifiedBy: '350',
    modifiedOn: '2018-02-27T11:40:00.363+0000',
    createdOn: '2018-02-27T11:40:00.363+0000',
    type: 'PAGENOTE',
    page: 1,
    comments: [{
      content: 'I am some test Text 1'
    }]},
  {
    createdBy: '350',
    lastModifiedBy: '350',
    modifiedOn: '2018-02-27T11:40:00.363+0000',
    createdOn: '2018-02-27T11:40:00.363+0000',
    type: 'PAGENOTE',
    page: 5,
    comments: [{
      content: 'I am some test Text 5'
    }]
  }
];

const jpegObject = {
  mimeType: 'image/jpeg',
  originalDocumentName: 'image.jpeg',
  _links: {
    binary: {
      href: `${documentUrl}/binary`
    }
  }
};

const pdfObject = {
  mimeType: 'application/pdf',
  originalDocumentName: 'cert.pdf',
  _links: {
    binary: {
      href: `${documentUrl}/binary`
    }
  }
};

const mockError404 = {
  status: 404, statusText: 'Not Found'
};

const mockError401 = {
  status: 401, statusText: 'Unauthorized'
};


const invalidDataParameter = 'Invalid request parameters';


describe('EmAnnotationSummaryComponent', () => {
  let httpMock: HttpTestingController;
  let component: EmAnnotationSummaryComponent;
  let fixture: ComponentFixture<EmAnnotationSummaryComponent>;

  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [EmAnnotationSummaryModule, HttpClientTestingModule, CookieModule.forRoot()],
      declarations: [],
      providers: []
    })
      .compileComponents();
  }));

///////////////////////////////
// With URL & With JWT    //
///////////////////////////////

  describe('With URL & With JWT', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(EmAnnotationSummaryComponent);
      component = fixture.componentInstance;
      httpMock = TestBed.get(HttpTestingController);
      component.url = documentUrl;
      element = fixture.debugElement;

      fixture.detectChanges();
    });

    describe('when the mime type is an image', () => {
      beforeEach(() => {
        const req = httpMock.expectOne(documentUrl);
        req.flush(jpegObject);
        fixture.detectChanges();
      });

      it('should display document name', () => {
        expect(element.nativeElement.querySelector('h1').textContent).toEqual('image.jpeg');
      });

    });

    describe('when the mime type is pdf', () => {
      beforeEach(() => {
        const req = httpMock.expectOne(documentUrl);
        req.flush(pdfObject);
        fixture.detectChanges();
      });

      it('should display document name', () => {
        expect(element.nativeElement.querySelector('h1').textContent).toEqual('cert.pdf');
      });

      describe('and has with annotation', () => {
        beforeEach(() => {
          const annoReq = httpMock.expectOne(findAnnotationUrl);
          annoReq.flush(annotationSetObject);
          component.annotationSet = annotationSetObject;
          component.annotations = annotationsObject;
          fixture.detectChanges();
        });

        it('should have one summary', () => {
          expect(element.nativeElement.querySelector('.lede').textContent).toContain('I am some test Text');
        });
      });

      describe('and has with annotation', () => {
        beforeEach(() => {
          const annoReq = httpMock.expectOne(findAnnotationUrl);
          annoReq.flush(annotationSetObject);
          component.annotationSet = annotationSet4Object;
          component.annotations = annotations4Object;
          fixture.detectChanges();
        });

        it('should have one summary', () => {
          expect(element.nativeElement.querySelector('.lede').textContent).toContain('I am some test Text');
        });
      });

      describe('and has fails to get annotations', () => {
        beforeEach(() => {
          const annoReq = httpMock.expectOne(findAnnotationUrl);
          annoReq.flush(null);
          // component.annotationSet = null;
          // component.annotations = null;
          fixture.detectChanges();
        });

        it('should display an error with the status', () => {
          expect(element.nativeElement.querySelector('.lede')).not.toBeTruthy();
        });
      });


    });

    describe('when the server returns an error', () => {
      beforeEach(() => {
        const req = httpMock.expectOne(documentUrl);
        req.flush(invalidDataParameter, mockError404);
        fixture.detectChanges();
      });

      it('should display an error with the status', () => {
        expect(element.nativeElement.querySelector('.error-summary').textContent).toContain('404');
      });

      it('img element should not be visible', () => {
        expect(element.nativeElement.querySelector('h1')).not.toBeTruthy();
      });

    });
  });
///////////////////////////////
// Without URL & With JWT    //
///////////////////////////////

  describe('Without URL With JWT', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(EmAnnotationSummaryComponent);
      component = fixture.componentInstance;
      httpMock = TestBed.get(HttpTestingController);
      component.url = '';
      element = fixture.debugElement;
      fixture.detectChanges();
    });

    it('should display an error with the status', () => {
      expect(element.nativeElement.querySelector('.error-summary').textContent)
        .toContain('Something went wrong!');
    });
  });

///////////////////////////////
// Without URL & Without JWT //
///////////////////////////////

  describe('Without URL & Without JWT', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(EmAnnotationSummaryComponent);
      component = fixture.componentInstance;
      httpMock = TestBed.get(HttpTestingController);
      component.url = null;
      element = fixture.debugElement;

      fixture.detectChanges();
    });

    it('should display an error with the status', () => {
      expect(element.nativeElement.querySelector('.error-summary').textContent)
        .toContain('Something went wrong!');
    });
  });
});

