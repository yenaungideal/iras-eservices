import { Component, OnDestroy } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'common-ui-lib-showcase';
  routes = [
    {
      path: 'menu',
      text: 'split-view',
    },
  ];
  mediaSubscription: Subscription;

  constructor(private router: Router, private mediaObserver: MediaObserver) {
    this.mediaSubscription = this.mediaObserver
      .asObservable()
      .pipe(map((mc) => mc.find((c) => c.mqAlias.length === 2).mqAlias))
      .subscribe((alias) => {
        console.log({ breakpoint: alias });
      });
  }
  ngOnDestroy(): void {
    this.mediaSubscription.unsubscribe();
  }
}
