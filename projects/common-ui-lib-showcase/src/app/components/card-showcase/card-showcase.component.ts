import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-showcase',
  templateUrl: './card-showcase.component.html',
  styleUrls: ['./card-showcase.component.scss'],
})
export class CardShowcaseComponent implements OnInit {
  cardItem2Valid = false;
  constructor() {}

  ngOnInit(): void {}

  toggleCardValidity() {
    this.cardItem2Valid = !this.cardItem2Valid;
  }
}
