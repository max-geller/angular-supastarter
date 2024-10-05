import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { UserService } from './user.service';
import { ToastService } from './toast.service';
import { Observable, from, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

import { avatarColors } from '../data/avatarColors';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private avatarColors = avatarColors;

  constructor(
    private supabaseService: SupabaseService,
    private userService: UserService,
    private toastService: ToastService,
    private authService: AuthService
  ) {}

  generateRandomColorFromList() {
    // This looks good!
    return this.avatarColors[
      Math.floor(Math.random() * this.avatarColors.length)
    ].name;
  }

  updateAvatarColor(userId: string, colorName: string): Observable<string> {
    const colorObject = this.avatarColors.find((c) => c.name === colorName);
    if (colorObject) {
      return this.userService.updateUserProfile({ avatar_color: colorObject.color }).pipe(
        map(() => {
          this.toastService.showToast(
            'Avatar color updated successfully',
            3000,
            'top',
            'center'
          );
          return colorObject.color;
        })
      );
    } else {
      return new Observable(observer => {
        observer.error('Invalid color name');
      });
    }
  }

  private getCurrentUserId(): string | null {
    const currentUser = this.authService.getCurrentUser();
    return currentUser.user?.id || null;
  }

  uploadAvatar( file: File): Observable<string> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('User not authenticated');
      });
    }

    const fileExtension = file.name.split('.').pop();
    const filePath = `avatars/${userId}.${fileExtension}`;

    return from(
      this.supabaseService
        .getClient()
        .storage.from('avatars')
        .upload(filePath, file, { upsert: true })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        const avatarUrl = this.supabaseService
          .getClient()
          .storage.from('avatars')
          .getPublicUrl(data.path).data.publicUrl;
        return avatarUrl;
      }),
      switchMap((avatarUrl) =>
        this.userService.updateUserProfile({ avatar_url: avatarUrl }).pipe(
          map(() => {
            this.toastService.showToast(
              'Avatar uploaded successfully',
              3000,
              'top',
              'center'
            );
            return avatarUrl;
          })
        )
      )
    );
  }

  getAvatarColorsList() {
    return this.avatarColors;
  }
}
