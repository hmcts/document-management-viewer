import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgViewerComponent } from './img-viewer.component';
import {ImagePipe} from '../../utils/image-pipe';
import {ConnectionBackend, Http, RequestOptions} from '@angular/http';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SessionService} from "../../auth/session.service";
import {CookieService} from "angular2-cookie/core";
import {WindowService} from "../../utils/window.service";

describe('ImgViewerComponent', () => {
  let component: ImgViewerComponent;
  let fixture: ComponentFixture<ImgViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgViewerComponent, ImagePipe ],
      imports:[HttpClientTestingModule],
      providers: [HttpClient, SessionService, CookieService, WindowService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
