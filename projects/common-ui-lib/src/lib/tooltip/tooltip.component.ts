import {
  Component,
  Input,
  ViewEncapsulation,
  TemplateRef,
  ViewContainerRef,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { PopoverService } from '../popover/popover.service';
import { PopoverConfig } from '../popover/popover-config';

@Component({
  selector: 'iras-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  @Input() templateLabelRef: TemplateRef<any>;
  @Input() tooltipLabelType: 'info' | 'help' | 'custom' = 'info';
  @Input() tooltipLabelText: string;
  @Input() tooltipContentTitle: string;
  @Input() tooltipContentText: string;
  @Input() minTooltipPanelWidth: string;
  @Input() maxTooltipPanelWidth: string;
  @Input() showCloseButton = true;
  @Input() position: 'after' | 'before' | 'above' | 'below' = 'after';

  templatePortal: TemplatePortal<any>;
  overlayPane: HTMLElement;
  popoverRef: any;
  constructor(
    private popoverService: PopoverService,
    private _viewContainerRef: ViewContainerRef,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.tooltipLabelType === 'custom' && this.templateLabelRef) {
      this.templatePortal = new TemplatePortal(this.templateLabelRef, this._viewContainerRef);
    }
    this.cdr.detectChanges();
  }

  showTooltip(template: TemplateRef<any>, target: HTMLElement) {
    if (!this.popoverRef) {
      this.popoverRef = this.popoverService.open(template, target, {
        hasBackdrop: false,
        disableClose: !this.showCloseButton,
        panelClass: 'iras-popover',
        backdropClass: 'iras-popover--backdrop',
        position: this.position,
        arrowOffset: 10,
        arrowSize: 20,
      } as PopoverConfig);
      this.overlayPane = document.querySelector('.cdk-overlay-pane .popover-container');
      if (this.minTooltipPanelWidth) {
        this.overlayPane.style.minWidth = `${this.minTooltipPanelWidth}px`;
      }
      if (this.maxTooltipPanelWidth) {
        this.overlayPane.style.maxWidth = `${this.maxTooltipPanelWidth}px`;
      }
    }
  }
  closeTooltip(popover: any) {
    popover.close();
    this.popoverRef = '';
  }
  ngOnDestroy() {
    if (this.popoverRef) {
      this.popoverRef.close();
    }
  }
}
