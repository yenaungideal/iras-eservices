import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  private pdfContent: any;

  public exportPDF(pdf: any, pdfContent: any, pdfName: string = 'document.pdf') {
    this.pdfContent = pdfContent;
    this.replaceShadowDomsWithHtml(this.pdfContent.nativeElement);

    const savePdf = new Promise((resolve, reject) => {
      pdf.saveAs(pdfName);
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    savePdf.then(() => {
      this.removeShadowHostInnerHTML(this.pdfContent.nativeElement);
    });
  }

  private replaceShadowDomsWithHtml(element: any) {
    for (const el of element.querySelectorAll('*')) {
      if (el.shadowRoot) {
        this.replaceShadowDomsWithHtml(el.shadowRoot);
        el.innerHTML += this.getShadowDomHtml(el.shadowRoot);
      }
    }
  }

  private getShadowDomHtml(shadowRoot: any) {
    let shadowHTML = '';
    for (const el of shadowRoot.childNodes) {
      let html = el.nodeValue || el.outerHTML;
      html = html.replace(':host', ':root');
      shadowHTML += html;
    }
    return shadowHTML;
  }

  private removeShadowHostInnerHTML(element: any) {
    for (const el of element.querySelectorAll('*')) {
      if (el.shadowRoot) {
        this.removeShadowHostInnerHTML(el.shadowRoot);
        el.innerHTML = '';
      }
    }
  }
}
