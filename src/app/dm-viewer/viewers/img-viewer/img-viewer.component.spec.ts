import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgViewerComponent } from './img-viewer.component';
import {ImagePipe} from '../../../utils/image-pipe';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SessionService} from '../../../auth/session.service';
import {CookieModule, CookieService} from 'ngx-cookie';
import {WindowService} from '../../../utils/window.service';
import {DebugElement} from '@angular/core';
import {CookieOptionsProvider} from 'ngx-cookie/src/cookie-options-provider';

describe('ImgViewerComponent', () => {
  let component: ImgViewerComponent;
  let fixture: ComponentFixture<ImgViewerComponent>;
  let httpMock;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgViewerComponent, ImagePipe ],
      imports: [HttpClientTestingModule, CookieModule.forRoot()],
      providers: [HttpClient, SessionService, WindowService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgViewerComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xdescribe('when we set the url', () => {
    beforeEach(() => {
      const url = 'https://document-url';
      const req = httpMock.expectOne(url);
      req.flush();

      component.url = url;
      fixture.detectChanges();
    });

    xit('should download the image', () => {
      expect(element.nativeElement.querySelector('img')).toBeTruthy();
    });
  });
});
