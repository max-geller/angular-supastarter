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

// Import RxJS Operators
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Import Services
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { TenantService } from '../../../core/services/tenant.service';
import { NetworkService } from '../../../core/services/network.service';

@Component({
  selector: 'app-dev-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, AsyncPipe],
  templateUrl: './dev-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .network-icon {
      transform: scale(0.75);
      vertical-align: middle;
    }
  `]
})
export class DevFooterComponent implements OnInit {
  environmentMode: string = '';
  environmentVersion: string = '';
  showFooter: boolean = false;
  currentUserEmail$: Observable<string | null>;
  currentTenantName$: Observable<string>;
  connectionType$: Observable<string>;
  networkSpeed$: Observable<number>;

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
      map(session => session?.user?.email ?? null)
    );
    this.currentTenantName$ = this.userService.getCurrentUserTenantName();
    this.connectionType$ = this.networkService.getConnectionTypeObservable();
    this.networkSpeed$ = this.networkService.getNetworkSpeedObservable();
  }

  ngOnInit(): void {
    // Any initialization logic if needed
  }

  getNetworkSpeedColor(speed: number): string {
    return this.networkService.getNetworkSpeedColor(speed);
  }
}
