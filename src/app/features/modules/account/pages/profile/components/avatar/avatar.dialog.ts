import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AvatarModule } from 'ngx-avatars';
import { avatarColors } from './../../../../../../../core/data/avatarColors';
import { UserService } from './../../../../../../../core/services/user.service';
import { AvatarService } from './../../../../../../../core/services/avatar.service';
import { UserInterface } from './../../../../../../../core/models/user.model';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelectModule,
    MatFormFieldModule,
    AvatarModule,
  ],
  templateUrl: './avatar.dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarDialog implements OnInit {
  avatarColors = avatarColors;
  currentUser: UserInterface | null = null;

  constructor(
    private userService: UserService,
    private avatarService: AvatarService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
      }
    });
  }

  get userFullName(): string {
    return this.currentUser ? `${this.currentUser.first_name} ${this.currentUser.last_name}` : '';
  }

  get userAvatarColor(): string {
    return this.currentUser?.avatar_color || '#3f51b5'; // Default color if not set
  }

  updateAvatarColor(color: string) {
    if (this.currentUser) {
      this.userService.updateUserProfile({ avatar_color: color }).subscribe({
        next: (updatedUser) => {
          this.currentUser = updatedUser;
        },
        error: (error) => {
          console.error('Error updating avatar color:', error);
        }
      });
    }
  }
}
