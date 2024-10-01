import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dev-footer',
  standalone: true,
  imports: [MatToolbarModule, AsyncPipe, CommonModule],
  templateUrl: './dev-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevFooterComponent {
  isDevMode: boolean;

  constructor(
    @Inject('ENVIRONMENT') private env: any
  ) {
    this.isDevMode = !this.env.production;
  }
}
