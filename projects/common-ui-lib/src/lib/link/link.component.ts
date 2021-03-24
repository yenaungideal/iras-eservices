import {
  Component,
  ViewEncapsulation,
  Input,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'iras-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LinkComponent implements AfterViewInit {
  @Input() templateContentRef: TemplateRef<any>;
  @Input() cssClass: string[];
  @Input() color: string;
  @Input() includeChar: string;
  templatePortal: TemplatePortal<any>;
  constructor(private _viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.templateContentRef) {
      this.templatePortal = new TemplatePortal(this.templateContentRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }
}
