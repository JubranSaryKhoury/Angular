import { Directive, ElementRef, input, inject } from '@angular/core';
import { LogDirective } from './log.directive';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
  hostDirectives: [LogDirective],
})
export class SafeLinkDirective {
  // here as in component I can you input or @Input
  // here using input for example
  queryParam = input('myapp', { alias: 'appSafeLink' }); // alias --> this input has this name('queryParam') internally and this name ('appSafeLink') externally

  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafaLinkDirective is active!');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToleave = window.confirm('Are you sure you want to leave?');

    if (wantsToleave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }

    event?.preventDefault(); // cancel the navigation
  }
}
