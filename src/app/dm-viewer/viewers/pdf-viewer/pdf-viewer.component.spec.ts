import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerComponent } from './pdf-viewer.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import {SessionService} from '../../../auth/session.service';
import {CookieModule, CookieService} from 'ngx-cookie';
import {WindowService} from '../../../utils/window.service';
import {CookieOptionsProvider} from 'ngx-cookie/src/cookie-options-provider';

describe('PdfViewerComponent', () => {
  let sessionService: SessionService;
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PdfViewerModule,  CookieModule.forRoot()],
      declarations: [ PdfViewerComponent ],
      providers: [SessionService, WindowService]
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
