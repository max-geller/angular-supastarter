import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

// Import Angular Material Components
import { MatToolbarModule } from '@angular/material/toolbar';

// Import Services
import { AuthService } from '../../../core/services/auth.service';

// Import Interfaces
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dev-footer',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe],
  templateUrl: './dev-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevFooterComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.currentUser = this.authService.getCurrentUser();
  }

  ngOnDestroy(): void {}
}
