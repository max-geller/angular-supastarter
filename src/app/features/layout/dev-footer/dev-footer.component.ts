import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment.staging';

@Component({
  selector: 'app-dev-footer',
  standalone: true,
  imports: [CommonModule,MatToolbarModule, AsyncPipe],
  templateUrl: './dev-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevFooterComponent implements OnInit {
  isDevMode = !environment.production;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Initialization logic here
  }
}
