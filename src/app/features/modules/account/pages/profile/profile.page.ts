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
  tenant: TenantInterface | null = null;

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
  }

  initForm() {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    });
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
    if (userId) {
      this.tenantService.getUserTenant(userId).subscribe(
        (tenant: TenantInterface) => {
          this.tenant = tenant;
          this.cdr.markForCheck();
        },
        (error) => console.error('Error loading tenant info:', error)
      );
    }
  }

  onSubmit() {
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
}
