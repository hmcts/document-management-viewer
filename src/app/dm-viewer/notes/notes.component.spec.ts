import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NotesComponent } from './notes.component';
import {beforeEach} from 'selenium-webdriver/testing';
import {DebugElement} from '@angular/core';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise to page 0', () => {
    expect(component.page).toEqual(0);
  });

  it('should default to 0 pages', () => {
    expect(component.numPages).toEqual(0);
  });

  describe('when there is a note against the current page', () => {
    beforeEach(() => {
      element.nativeElement.querySelector('textarea').textContent = '';
      fixture.detectChanges();
    });


  });


});
