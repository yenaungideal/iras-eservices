import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from './service/pdf-export.service';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';

@Component({
  selector: 'app-pdf-export',
  templateUrl: 'pdf-export-showcase.component.html',
  styleUrls: ['./pdf-export.showcase.component.scss'],
})
export class PdfExportShowcaseComponent implements OnInit {
  @ViewChild('pdfContent') pdfContent: ElementRef;
  @ViewChild('pdf') pdf: PDFExportComponent;
  scale = 0.8;

  constructor(private pdfExportService: PdfExportService) {}

  ngOnInit() {}

  exportPdf() {
    console.log('Exporting PDF...');
    this.pdfExportService.exportPDF(this.pdf, this.pdfContent, 'stamp-duty-receipt.pdf');
  }
}
