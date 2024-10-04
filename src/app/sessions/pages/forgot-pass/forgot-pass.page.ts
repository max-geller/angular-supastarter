import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

// Import Services
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './forgot-pass.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPassPage {
  resetForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      try {
        await this.authService.resetPassword(this.resetForm.value.email);
        this.router.navigate(['/sessions/login']);
      } catch (error) {
        console.error('Reset password error:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
}
