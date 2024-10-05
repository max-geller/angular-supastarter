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
import { HttpClientModule } from '@angular/common/http';

// Import Angular Material Components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSpinner } from '@angular/material/progress-spinner';

// Import Components
import { AvatarDialog } from './components/avatar/avatar.dialog';

// Import Services
import { UserService } from '../../../../../core/services/user.service';
import { TenantService } from '../../../../../core/services/tenant.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { ToastService } from '../../../../../core/services/toast.service';
import { AvatarService } from '../../../../../core/services/avatar.service';

// Import Interfaces
import { UserInterface } from '../../../../../core/models/user.model';
import { TenantInterface } from '../../../../../core/models/tenant.model';

// Import Third-Party Resources
import { AvatarModule } from 'ngx-avatars';
import { forkJoin } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    AvatarModule,
    AvatarDialog,
    HttpClientModule,
    MatSpinner,

  ],
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  tenant: TenantInterface | null = null;
  userRole: string | null = null;
  user: UserInterface | null = null;
  isLoading: boolean = true; // Add this line

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tenantService: TenantService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService,
    private avatarService: AvatarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadUserData();
  }

  initForm() {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [{ value: '', disabled: true }],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  openAvatarDialog() {
    const dialogRef = this.dialog.open(AvatarDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
        this.cdr.markForCheck();
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  loadUserData() {
    this.isLoading = true;
    const currentUserId = this.authService.getCurrentUser().user?.id;

    if (!currentUserId) {
      console.error('No user ID available');
      this.isLoading = false;
      this.cdr.markForCheck();
      return;
    }

    forkJoin({
      profile: this.userService.getUserProfile(),
      tenant: this.tenantService.getUserTenant(currentUserId),
      role: this.userService.getCurrentUserWithRole()
    }).subscribe({
      next: (data) => {
        this.user = data.profile;
        this.tenant = data.tenant;
        this.userRole = data.role.role_name || null;
        this.profileForm.patchValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
        });
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  getAvatarColor(): string {
    return (
      this.user?.avatar_color ||
      this.avatarService.generateRandomColorFromList()
    );
  }

  uploadAvatar(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.avatarService.uploadAvatar(file).subscribe(
        (avatarUrl) => {
          if (this.user) {
            this.user.avatar_url = avatarUrl;
            this.cdr.markForCheck();
          }
        },
        (error) => console.error('Error uploading avatar:', error)
      );
    }
  }

  generateAvatar() {
    const newColor = this.avatarService.generateRandomColorFromList();
    if (this.user) {
      this.avatarService.updateAvatarColor(this.user.id, newColor);
      this.user.avatar_color = newColor;
      this.user.avatar_url = ''; // Clear the avatar URL to show the generated avatar
      this.cdr.markForCheck();
    }
  }

  loadTenantInfo() {
    const userId = this.authService.getCurrentUser().user?.id;
    if (userId) {
      this.tenantService.getUserTenant(userId).subscribe(
        (tenant: TenantInterface) => {
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

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      const currentPassword = this.passwordForm.get('currentPassword')?.value;
      const newPassword = this.passwordForm.get('newPassword')?.value;

      this.authService
        .updateProfilePassword(currentPassword, newPassword)
        .then(() => {
          this.toastService.showToast(
            'Password updated successfully',
            3000,
            'top',
            'center'
          );
          this.passwordForm.reset();
          this.cdr.markForCheck();
        })
        .catch((error) => {
          console.error('Error updating password:', error);
          this.toastService.showToast(
            'Error updating password: ' + error.message,
            5000,
            'top',
            'center'
          );
        });
    }
  }
}
