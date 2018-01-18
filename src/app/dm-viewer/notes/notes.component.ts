import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  private _page: string;

  @Input() numPages = 0;

  notes = [];
  currentNote = '';

  constructor() { }

  ngOnInit() {
  }

  @Input() set page(value: string) {
    this._page = value;
    if (this.notes) {
      if (!this.notes[this._page]) {
        this.notes[this._page] = '';
      }
      this.currentNote = this.notes[this._page];
    }
  }

  updateNotes() {
    this.notes[this._page] = this.currentNote;
  }
}
