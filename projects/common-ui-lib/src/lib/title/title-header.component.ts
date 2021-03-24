import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'iras-title-header',
  templateUrl: './title-header.component.html',
  styleUrls: ['./title-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleHeaderComponent {
  @Input() public title: string;
}
