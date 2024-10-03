import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

// Import Angular Material Components
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

// Import RxJS Operators
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Import Services
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { TenantService } from '../../../core/services/tenant.service';
import { NetworkService } from '../../../core/services/network.service';

// Import Models
import { UserInterface } from '../../../core/models/user.model';

@Component({
  selector: 'app-dev-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    AsyncPipe,
  ],
  templateUrl: './dev-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .network-icon {
        transform: scale(0.75);
        vertical-align: middle;
      }
    `,
    `
      .user-info {
        position: relative;
      }
      .custom-tooltip {
        position: absolute;
        background-color: #333;
        color: white;
        padding: 5px;
        border-radius: 3px;
        font-size: 12px;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        display: none;
        z-index: 1000;
      }
      .user-info:hover .custom-tooltip {
        display: block;
      }
    `,
  ],
})
export class DevFooterComponent implements OnInit {
  environmentMode: string = '';
  environmentVersion: string = '';
  showFooter: boolean = false;
  currentUserEmail$: Observable<string | null>;
  currentTenantName$: Observable<string>;
  connectionType$: Observable<string>;
  networkSpeed$: Observable<number>;
  currentUserProvider$: Observable<string | null>;
  currentUserId$: Observable<string | null>;
  currentUser: UserInterface | null = null;

  constructor(
    @Inject('ENVIRONMENT') private env: any,
    private authService: AuthService,
    private userService: UserService,
    private tenantService: TenantService,
    private networkService: NetworkService
  ) {
    this.environmentMode = this.env.name;
    this.environmentVersion = this.env.version;
    this.showFooter = this.env.showDevFooter;
    this.currentUserEmail$ = this.authService.session.pipe(
      map((session) => session?.user?.email ?? null)
    );
    this.currentTenantName$ = this.userService.getCurrentUserTenantName();
    this.connectionType$ = this.networkService.getConnectionTypeObservable();
    this.networkSpeed$ = this.networkService.getNetworkSpeedObservable();
    this.currentUserProvider$ = this.authService.getCurrentUserProvider();
    this.currentUserId$ = this.authService.session.pipe(
      map((session) => session?.user?.id ?? null)
    );
  }

  ngOnInit(): void {
    this.userService.getCurrentUserWithRole().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  getNetworkSpeedColor(speed: number): string {
    return this.networkService.getNetworkSpeedColor(speed);
  }

  isOffline(speed: number): boolean {
    return this.networkService.isOffline(speed);
  }
}
