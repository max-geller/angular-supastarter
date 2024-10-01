import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  isDevMode,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';

// Import RxJS Resources
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

// Import Components
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { DevFooterComponent } from './dev-footer/dev-footer.component';

// Import Angular Material Components
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';

// Import Services
import { CurrentModuleService } from '../../core/services/current-module.service';

// Import Data
import { mainMenu } from '../../core/data/menuItems';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppNavbarComponent,
    DevFooterComponent,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    AsyncPipe,
    MatRippleModule,
  ],
  templateUrl: './app.layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout implements OnInit, OnDestroy {
  isDevelopmentMode: boolean = false;
  currentModule$: Observable<string> = new Observable();
  currentModuleMenuItems$: Observable<any[]> = new Observable();
  currentModuleSidenavItems$: Observable<any[]> = new Observable();

  private moduleSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private currentModuleService: CurrentModuleService
  ) {}

  mainMenu = mainMenu;
  sidenavIsOpen = false;

  ngOnInit() {
    this.isDevelopmentMode = isDevMode();

    this.currentModule$ = this.currentModuleService.currentModule$;

    this.currentModuleMenuItems$ = this.currentModule$.pipe(
      map((currentModule) => {
        const currentModuleData = this.mainMenu.find((item) =>
          item.route.includes(`/${currentModule}`)
        );
        return currentModuleData?.menuItems || [];
      })
    );

    this.currentModuleSidenavItems$ = this.currentModule$.pipe(
      map((currentModule) => {
        const currentModuleData = this.mainMenu.find((item) =>
          item.route.includes(`/${currentModule}`)
        );
        return currentModuleData?.menuItems || [];
      })
    );
  }

  ngOnDestroy() {
    if (this.moduleSubscription) {
      this.moduleSubscription.unsubscribe();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onTabClick(link: any) {
    this.router.navigate([link.route]);
  }
}
