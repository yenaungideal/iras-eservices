import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-file-upload-showcase',
  templateUrl: './file-upload-showcase.component.html',
  styleUrls: ['./file-upload-showcase.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class FileUploadShowcaseComponent implements OnInit {
  maxNoFiles = 2;

  constructor() {}

  ngOnInit(): void {}

  handleFiles(fileArray: any) {
    console.log('files uploaded', fileArray);
  }
}
