import {
  Component,
  Inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthChangeEvent,
  AuthSession,
  Session,
  User,
} from '@supabase/supabase-js';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dev-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, AsyncPipe],
  templateUrl: './dev-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevFooterComponent implements OnInit {
  environment: string = '';
  showFooter: boolean = false;
  currentUser: User | null = null;

  constructor(
    @Inject('ENVIRONMENT') private env: any,
    private authService: AuthService
  ) {
    this.environment = this.env.name;
    this.showFooter = this.env.showDevFooter;
  }
  ngOnInit() {}
}
