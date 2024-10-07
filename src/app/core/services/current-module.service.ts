import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CurrentModuleService {
  private currentModuleSubject: BehaviorSubject<string>;
  currentModule$: Observable<string>;

  constructor(private router: Router) {
    this.currentModuleSubject = new BehaviorSubject<string>(
      this.getSecondSegment(this.router.url)
    );
    this.currentModule$ = this.currentModuleSubject.asObservable();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getSecondSegment(this.router.url)),
        distinctUntilChanged()
      )
      .subscribe((module) => this.currentModuleSubject.next(module));
  }

  private getSecondSegment(url: string): string {
    const segments = url.split('/').filter((segment) => segment);
    return segments.length > 1 ? segments[1] : '';
  }
}
