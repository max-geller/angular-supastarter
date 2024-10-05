import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { AvatarModule } from 'ngx-avatars';
import { avatarColors } from './../../../../../../../core/data/avatarColors';
import { UserService } from './../../../../../../../core/services/user.service';
import { AvatarService } from './../../../../../../../core/services/avatar.service';
import { UserInterface } from './../../../../../../../core/models/user.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
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
    private avatarService: AvatarService,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<AvatarDialog>
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.cdr.detectChanges();
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

  updateAvatarColor(colorName: string) {
    if (this.currentUser) {
      this.avatarService.updateAvatarColor(this.currentUser.id, colorName).subscribe({
        next: (color) => {
          if (this.currentUser) {
            this.currentUser.avatar_color = color;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Error updating avatar color:', error);
        }
      });
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.avatarService.uploadAvatar(file).subscribe({
        next: (avatarUrl) => {
          console.log('Avatar uploaded successfully:', avatarUrl);
          if (this.currentUser) {
            this.currentUser.avatar_url = avatarUrl;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Error uploading avatar:', error);
        }
      });
    }
  }

  useBasicAvatar() {
    if (this.currentUser) {
      this.avatarService.removeAvatar(this.currentUser.id).subscribe({
        next: () => {
          if (this.currentUser) {
            this.currentUser.avatar_url = null;
            this.cdr.detectChanges();
          }
        },
        error: (error) => {
          console.error('Error removing avatar:', error);
        }
      });
    }
  }

  confirmAvatarChange() {
    this.dialogRef.close(this.currentUser);
  }
}
