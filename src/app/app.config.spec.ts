import {AppConfig} from './app.config';
import {async, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AppConfig tests', () => {
  let httpMock: HttpTestingController;
  let appConfig: AppConfig;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: [AppConfig]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    httpMock = TestBed.get(HttpTestingController);
    appConfig = TestBed.get(AppConfig);
    appConfig.load();
    const request = httpMock.expectOne('assets/config.json');
    request.flush({
      'annotation_url': 'http://localhost:3623/annotation-sets',
      'login_url': 'https://localhost:3501/login'
    });
  }));

  it('should load annotation url', () => {
    expect(appConfig.getAnnotationUrl()).toEqual('http://localhost:3623/annotation-sets');
  });

  it('should load annotation url', () => {
    expect(appConfig.getLoginUrl()).toEqual('https://localhost:3501/login');
  });

});
