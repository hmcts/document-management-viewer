import {Component, Input, OnInit} from '@angular/core';
import {Viewer} from '../viewer';

@Component({
  selector: 'app-unsupported-viewer',
  templateUrl: './unsupported-viewer.component.html',
  styleUrls: ['./unsupported-viewer.component.scss']
})
export class UnsupportedViewerComponent implements OnInit, Viewer {

  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}
