import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// Import Services
import { UserService } from '../../../../../core/services/user.service';
import { TenantService } from '../../../../../core/services/tenant.service';
import { AuthService } from '../../../../../core/services/auth.service';

// Import Interfaces
import { UserInterface } from '../../../../../core/models/user.model';
import { TenantInterface } from '../../../../../core/models/tenant.model';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  tenant: TenantInterface | null = null;
  userRole: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tenantService: TenantService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadUserProfile();
    this.loadTenantInfo();
    this.loadUserRole();
  }

  initForm() {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe(
      (profile: UserInterface) => {
        this.profileForm.patchValue({
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
        });
        this.cdr.markForCheck();
      },
      (error) => console.error('Error loading user profile:', error)
    );
  }

  loadTenantInfo() {
    const userId = this.authService.getCurrentUser().user?.id;
    console.log('Current user ID:', userId);
    if (userId) {
      this.tenantService.getUserTenant(userId).subscribe(
        (tenant: TenantInterface) => {
          console.log('Tenant data received:', tenant);
          this.tenant = tenant;
          this.cdr.markForCheck();
        },
        (error) => {
          console.error('Error loading tenant info:', error);
          this.tenant = null;
          this.cdr.markForCheck();
        }
      );
    } else {
      console.log('No user ID available');
      this.tenant = null;
      this.cdr.markForCheck();
    }
  }

  onProfileSubmit() {
    if (this.profileForm.valid) {
      const updatedProfile: Partial<UserInterface> = {
        first_name: this.profileForm.get('first_name')?.value,
        last_name: this.profileForm.get('last_name')?.value,
      };
      this.userService.updateUserProfile(updatedProfile).subscribe(
        () => {
          console.log('Profile updated successfully');
          this.cdr.markForCheck();
        },
        (error) => console.error('Error updating profile:', error)
      );
    }
  }

  loadUserRole() {
    this.userService.getCurrentUserWithRole().subscribe(
      (user: UserInterface) => {
        this.userRole = user.role_name || null;
        this.cdr.markForCheck();
      },
      (error) => console.error('Error loading user role:', error)
    );
  }
}
