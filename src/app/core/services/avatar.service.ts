import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { UserService } from './user.service';
import { ToastService } from './toast.service';
import { Observable, from, switchMap, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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

  uploadAvatar(file: File): Observable<string> {
    const userId = this.getCurrentUserId();
    if (!userId) {
      return new Observable(observer => {
        observer.error('User not authenticated');
      });
    }

    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const filePath = `avatars/${userId}/${timestamp}.${fileExtension}`;

    return this.removeOldAvatar(userId).pipe(
      switchMap(() => 
        from(
          this.supabaseService
            .getClient()
            .storage.from('avatars')
            .upload(filePath, file)
        )
      ),
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

  removeAvatar(userId: string): Observable<void> {
    return this.removeOldAvatar(userId).pipe(
      switchMap(() => this.userService.updateUserProfile({ avatar_url: null })),
      map(() => {
        this.toastService.showToast(
          'Avatar removed successfully',
          3000,
          'top',
          'center'
        );
      })
    );
  }

  private removeOldAvatar(userId: string): Observable<void> {
    return this.userService.getUserProfile().pipe(
      switchMap(user => {
        if (user.avatar_url) {
          const oldFilePath = new URL(user.avatar_url).pathname.split('/').pop();
          if (oldFilePath) {
            return from(
              this.supabaseService
                .getClient()
                .storage.from('avatars')
                .remove([`${userId}/${oldFilePath}`])
            ).pipe(
              catchError(error => {
                console.error('Error removing old avatar:', error);
                return of(null);
              })
            );
          }
        }
        return of(null);
      }),
      map(() => {})
    );
  }
}
