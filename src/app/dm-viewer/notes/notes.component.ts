import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  private _page = 0;

  @Input() numPages = 0;

  notes = [];
  private _currentNote = '';

  constructor() { }

  ngOnInit() {
  }

  @Input() set page(value: number) {
    this._page = value;
    if (this.notes) {
      if (!this.notes[this._page - 1]) {
        this.notes[this._page - 1] = '';
      }
      this.currentNote = this.notes[this._page - 1];
    }
  }

  get page(): number {
    return this._page;
  }

  set currentNote(value: string) {
    this._currentNote = value;
    this.notes[this._page - 1] = this._currentNote;
  }

  get currentNote(): string {
    return this._currentNote;
  }
}
