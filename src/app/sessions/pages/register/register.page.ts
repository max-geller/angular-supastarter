import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  currentUserEmail: string | null = null;
  currentUserId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    const { user, email } = this.authService.getCurrentUser();
    this.currentUserEmail = email;
    this.currentUserId = user?.id ?? null;

    if (this.currentUserEmail) {
      this.registerForm.patchValue({ email: this.currentUserEmail });
    }
    console.log(this.currentUserEmail);
    console.log(this.currentUserId);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid && this.currentUserId) {
      const { password, confirmPassword, ...userData } = this.registerForm.value;
      this.userService.registerUser(this.currentUserId, userData, password).subscribe({
        next: (user) => {
          console.log('User registered successfully', user);
          this.router.navigate(['/sessions/login']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          // Handle error (show message to user, etc.)
        }
      });
    } else {
      console.error('Form is invalid or user ID is missing');
      // Handle error (show message to user, etc.)
    }
  }
}
