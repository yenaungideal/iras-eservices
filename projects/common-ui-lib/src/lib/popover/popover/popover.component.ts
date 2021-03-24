import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, AfterViewInit } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent, state } from '@angular/animations';
import { PopoverRef } from '../popover-ref';

@Component({
  selector: 'iras-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  animations: [
    trigger('fade', [
      state('fadeOut', style({ opacity: 0 })),
      transition('* => fadeOut', animate('500ms')),
      transition(':enter', [style({ opacity: 0 }), animate('500ms', style({ opacity: 1 }))]),
    ]),
  ],
})
export class PopoverComponent implements AfterViewInit {
  portalType: 'component' | 'template';
  componentPortal: ComponentPortal<any>;
  templatePortal: TemplatePortal<any>;
  show = true;

  constructor(private popoverRef: PopoverRef) {}

  ngAfterViewInit() {
    if (this.popoverRef.config.disableClose) {
      setTimeout(() => {
        this.show = false;
      }, 2000);
    }
  }

  attachComponentPortal<T>(componentPortal: ComponentPortal<any>) {
    this.portalType = 'component';
    this.componentPortal = componentPortal;
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>) {
    this.portalType = 'template';
    this.templatePortal = portal;
  }

  fadeDone(event: AnimationEvent): void {
    if (event.toState === 'fadeOut') {
      this.popoverRef.close();
    }
  }
}
