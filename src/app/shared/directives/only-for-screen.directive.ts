import { Directive, OnInit, ElementRef, Renderer2, ViewContainerRef, TemplateRef, Input, OnDestroy } from '@angular/core';
import { ViewPortsServiceService } from 'src/app/view-ports-service.service';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';


@Directive({
  selector: '[appOnlyForScreen]'
})
export class OnlyForScreenDirective implements OnDestroy {
  screenSubscription$;
  currentWindowSize = '';
  viewPortConditionName = '';

  @Input() set appOnlyForScreen(name: string) {
    this.viewPortConditionName = name;
    if (this.viewPortConditionName.localeCompare(this.currentWindowSize) === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  resizeObservable$: Observable<Event>;
  resizeSubscription$: Subscription;


  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef,
              private viewPortService: ViewPortsServiceService) {

    this.screenSubscription$ = this.viewPortService.getScreenSubject()
    .pipe(distinctUntilChanged())
      .subscribe(
        value => {
          console.log(value);
          this.currentWindowSize = value;
          this.viewContainer.clear();
          if (this.viewPortConditionName.localeCompare(this.currentWindowSize) === 0) {
            this.viewContainer.createEmbeddedView(this.templateRef);
          }
        }
      );
  }

  ngOnDestroy(): void {
    if (this.screenSubscription$) {
      this.screenSubscription$.unsubscribe();
    }
  }

}
