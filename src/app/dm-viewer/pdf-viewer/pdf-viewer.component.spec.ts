import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerComponent } from './pdf-viewer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import {SessionService} from '../../auth/session.service';
import {CookieService} from 'angular2-cookie/core';

describe('PdfViewerComponent', () => {
  let sessionService: SessionService;
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PdfViewerModule],
      declarations: [ PdfViewerComponent ],
      providers: [SessionService, CookieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewerComponent);
    sessionService = TestBed.get(SessionService);
    sessionService.createSession({
      token: '12345'
    });
    component = fixture.componentInstance;
    component.url = 'http://test.pdf';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
