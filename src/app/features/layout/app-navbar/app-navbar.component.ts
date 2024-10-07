import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
// Import Services
import { AuthService } from '../../../core/services/auth.service';
import { CurrentModuleService } from '../../../core/services/current-module.service';
import { UserService } from '../../../core/services/user.service';

// Import Interfaces
import { UserInterface } from '../../../core/models/user.model';

// Import Angular Material Components
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';

// Import Data
import { mainMenu } from '../../../core/data/menuItems';
import { userMenu } from '../../../core/data/menuItems';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    HttpClientModule
  ],
  templateUrl: './app-navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavbarComponent implements OnInit, OnDestroy {
  mainMenu = mainMenu;
  userMenu = userMenu;

  private userSubscription: Subscription | undefined;

  currentModule$: Observable<string> | undefined;
  currentModuleName$: Observable<string> | undefined;
  currentUser$: Observable<UserInterface | null> | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private currentModuleService: CurrentModuleService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentModule$ = this.currentModuleService.currentModule$;
    this.currentModuleName$ = this.currentModule$.pipe(
      map((module) => {
        const moduleData = this.mainMenu.find((item) =>
          item.route.includes(`/${module}`)
        );
        return moduleData ? moduleData.name : 'MODULE';
      })
    );
    this.currentUser$ = this.userService.getUserProfile();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/sessions/login']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  @Output() toggleSidenav = new EventEmitter<void>();
}
