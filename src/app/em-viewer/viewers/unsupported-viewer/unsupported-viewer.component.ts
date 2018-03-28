import {Component, Input, OnInit} from '@angular/core';
import {Viewer} from '../viewer';

@Component({
  selector: 'app-unsupported-viewer',
  templateUrl: './unsupported-viewer.component.html',
  styleUrls: ['./unsupported-viewer.component.scss']
})
export class UnsupportedViewerComponent implements OnInit, Viewer {
  page = 0;
  numPages = 0;


  @Input() url: string;
  @Input() originalUrl: string;

  constructor() { }

  ngOnInit() {
  }

  prevPage() {}

  nextPage() {}

}
