import { Component, Inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dev-footer',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe],
  templateUrl: './dev-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevFooterComponent {
  isDevMode: boolean;
  isStaging: boolean;

  constructor(
    private authService: AuthService,
    @Inject('ENVIRONMENT') private env: any
  ) {
    this.isDevMode = !this.env.production;
    this.isStaging = this.env.staging;
  }
}
