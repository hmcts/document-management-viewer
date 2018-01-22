import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NotesComponent } from './notes.component';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

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

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    component.page = 0;
    fixture.detectChanges();
  }));

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
      component.currentNote = 'A note';
      fixture.detectChanges();
    });

    describe('and we swap to the next page', () => {
      beforeEach(() => {
        component.page = 1;
        fixture.detectChanges();
      });

      it('should update the current note to a blank note', () => {
        expect(component.currentNote).toEqual('');
      });

      describe('when we swap back to the previous page', () => {
        beforeEach(() => {
          component.page = 0;
          fixture.detectChanges();
        });

        it('should update the current note to the first page note', () => {
          expect(component.currentNote).toEqual('A note');
        });


      });

    });

  });

  function newEvent(eventName: string, bubbles = false, cancelable = false) {
    const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

});
