import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { config } from './mock-config';
import { IConfig } from './shared/interfaces/IConfig';
import { BehaviorSubject, Observable, Subscription, fromEvent, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewPortsServiceService implements OnDestroy {
  config: IConfig;
  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;
  screenSubject = new BehaviorSubject<string>('no');
  width: string;

  constructor() {
    this.config = config;
    this.updateScreenSubject();
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$
      .subscribe(() => this.updateScreenSubject());
  }
  ngOnDestroy(): void {
    if (this.resizeSubscription$) {
      this.resizeSubscription$.unsubscribe();
    }
  }

  public getScreenSubject() {
    return this.screenSubject;
  }

  updateScreenSubject() {
    const width = window.innerWidth;
    if (width < config.mobile) { this.screenSubject.next('mobile'); }
    if (config.mobile < width && width < config.tablet) { this.screenSubject.next('tablet'); }
    if (config.tablet < width) { this.screenSubject.next('desktop'); }
  }


}
