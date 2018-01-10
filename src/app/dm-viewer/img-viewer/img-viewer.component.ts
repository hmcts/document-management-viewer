import {Component, Input, OnInit} from '@angular/core';
import {Viewer} from '../viewer';

@Component({
  selector: 'app-img-viewer',
  templateUrl: './img-viewer.component.html',
  styleUrls: ['./img-viewer.component.scss']
})
export class ImgViewerComponent implements OnInit, Viewer {

  @Input() url: string;

  constructor() { }

  ngOnInit() {
  }

}
