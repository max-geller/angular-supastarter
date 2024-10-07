import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Import Angular Material Components
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

// Import Services
import { UserService } from '../../../../../../../core/services/user.service';
import { AdminService } from '../../../../../../../core/services/admin.service';
import { ToastService } from '../../../../../../../core/services/toast.service';
import { RoleService } from '../../../../../../../core/services/role.service';

// Import Models
import { UserInterface } from '../../../../../../../core/models/user.model';
import { RoleInterface } from '../../../../../../../core/models/role.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './user-details.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsPage implements OnInit {
  user: UserInterface | null = null;
  userForm: FormGroup;
  roles: RoleInterface[] = [];
  recentActivities: any[] = [
    { icon: 'edit', action: 'Updated profile', timestamp: new Date() },
    { icon: 'login', action: 'Logged in', timestamp: new Date(Date.now() - 86400000) },
    { icon: 'person_add', action: 'Invited a new user', timestamp: new Date(Date.now() - 172800000) },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    private toastService: ToastService,
    private roleService: RoleService
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: [''],
      role_id: ['', Validators.required],
      is_active: [true, Validators.required],
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(userId);
    }
    this.loadRoles();
  }

  loadUser(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.user = user;
        this.userForm.patchValue(user);
        this.userForm.markAsPristine();
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.toastService.showToast('Error loading user details');
      }
    });
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error('Error loading roles:', error);
        this.toastService.showToast('Error loading roles');
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid && this.user) {
      const updatedUser: Partial<UserInterface> = {
        id: this.user.id,
        first_name: this.userForm.value.first_name,
        last_name: this.userForm.value.last_name,
        role_id: this.userForm.value.role_id,
        is_active: this.userForm.value.is_active
      };
      this.adminService.updateUser(updatedUser).subscribe({
        next: () => {
          this.toastService.showToast('User updated successfully');
          this.router.navigate(['/features/admin/users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.toastService.showToast('Error updating user');
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/users']);
  }
}
