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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  currentUserEmail$: Observable<string | null>;

  constructor(
    @Inject('ENVIRONMENT') private env: any,
    private authService: AuthService
  ) {
    this.environment = this.env.name;
    this.showFooter = this.env.showDevFooter;
    this.currentUserEmail$ = this.authService.session.pipe(
      map(session => session?.user?.email ?? null)
    );
  }

  ngOnInit() {}
}
