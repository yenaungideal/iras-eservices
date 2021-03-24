import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ColorType } from '../../../types/color.type';

export type ButtonFillType = 'solid' | 'outline' | 'clear';
export type ButtonShapeType = 'round' | 'default' | 'circle' | 'custom';
export type ButtonSizeType = 'small' | 'default' | 'large';
@Component({
  selector: 'iras-custom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() disabled: boolean;
  @Input() fill: ButtonFillType = 'solid';
  @Input() shape: ButtonShapeType = 'default';
  @Input() size: ButtonSizeType = 'default';
  @Input() color: ColorType = 'primary';
  @Input() buttonText: string;
  @Input() cssClass: string;
  @Input() buttonType: 'button' | 'submit' = 'button';

  @Input() showSpinner = false;

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter();

  @ViewChild('button') buttonRef: ElementRef;
  _btnClass: {
    [key: string]: boolean;
  };
  constructor(@Inject(DOCUMENT) private document: any) {}

  ngOnInit() {
    this._btnClass = this.computeButtonClass();
  }

  ngOnChanges(changes: SimpleChanges) {
    this._btnClass = this.computeButtonClass();
  }

  computeButtonClass() {
    // btn class manipulation
    const containerClassMap = {} as any;
    containerClassMap[`iras-button__fill--${this.fill}`] = true;
    containerClassMap[`iras-button__shape--${this.shape}`] = true;
    containerClassMap[`iras-button__size--${this.size}`] = true;
    containerClassMap[`iras-color iras-color-${this.color} iras-button__color--${this.color}`] = true;
    return containerClassMap;
  }

  onButtonClick(event: any) {
    this.buttonClicked.emit();

    if (this.buttonType !== 'submit') {
      return;
    }
    const form = document.activeElement.closest('form');
    if (!form) {
      return;
    }
    event.preventDefault();
    const fakeSubmit = document.createElement('button');
    fakeSubmit.type = 'submit';
    fakeSubmit.style.display = 'none';
    form.appendChild(fakeSubmit);
    fakeSubmit.click();
    fakeSubmit.remove();
  }

  getContainerClassList() {
    return `${this.cssClass || ''} ${this.disabled ? 'iras-button__container--disabled' : ''} `;
  }
}
