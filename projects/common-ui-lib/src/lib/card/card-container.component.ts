import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  ChangeDetectorRef,
  TemplateRef,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'iras-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CardContainerComponent implements OnInit, AfterViewInit {
  @Input() templateContentRef: TemplateRef<any>;
  @Input() cssClass: string;
  templatePortal: TemplatePortal<any>;
  constructor(private _viewContainerRef: ViewContainerRef, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.templateContentRef) {
      this.templatePortal = new TemplatePortal(this.templateContentRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }

  getContainerClassList() {
    return `${this.cssClass || ''}`;
  }
}
