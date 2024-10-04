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
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
      const colorObject = this.avatarColors.find(c => c.name === colorName);
      if (colorObject) {
        const originalColor = this.currentUser.avatar_color;
        // Update the color immediately for instant feedback
        this.currentUser.avatar_color = colorObject.color;
        this.cdr.detectChanges();

        this.userService.updateUserProfile({ avatar_color: colorObject.color }).subscribe({
          next: (updatedUser) => {
            this.currentUser = updatedUser;
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error updating avatar color:', error);
            // Revert the color change if there's an error
            if (this.currentUser) {
              this.currentUser.avatar_color = originalColor;
              this.cdr.detectChanges();
            }
          }
        });
      }
    }
  }

  confirmAvatarChange() {
    this.dialogRef.close(this.currentUser);
  }
}
