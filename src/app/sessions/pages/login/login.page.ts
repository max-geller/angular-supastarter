import { ChangeDetectionStrategy, Component, type OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Import Angular Material Components
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Import Services
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';

// Import Components
import { LoginCarouselComponent } from '../../../shared/components/login-carousel/login-carousel.component';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    LoginCarouselComponent,
  ],
  templateUrl: './login.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.cdr.detectChanges(); // Trigger change detection
      const { email, password } = this.loginForm.value;
      try {
        await this.auth.signIn(email, password);
        this.router.navigate(['/features/dashboard']);
      } catch (error) {
        this.isLoading = false;
        this.loginForm.get('password')?.reset(); // Reset password field
        this.cdr.detectChanges(); // Trigger change detection
        if (error instanceof Error) {
          this.toastService.showToast(error.message, 5000);
        } else {
          this.toastService.showToast('An unexpected error occurred. Please try again.', 5000);
        }
        this.passwordInput.nativeElement.focus();
      }
    }
  }
}
