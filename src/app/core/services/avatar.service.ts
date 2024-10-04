import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { UserService } from './user.service';
import { ToastService } from './toast.service';
import { Observable, from, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';

import { avatarColors } from '../data/avatarColors';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private avatarColors = avatarColors;

  constructor(
    private supabaseService: SupabaseService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  generateRandomColorFromList() {
    // This looks good!
    return this.avatarColors[
      Math.floor(Math.random() * this.avatarColors.length)
    ].name;
  }

  updateAvatarColor(userId: string, colorName: string): void {
    const colorObject = this.avatarColors.find((c) => c.name === colorName);
    if (colorObject) {
      this.userService.updateUserProfile({ avatar_color: colorObject.color }).subscribe(() => {
        this.toastService.showToast(
          'Avatar color updated successfully',
          3000,
          'top',
          'center'
        );
      });
    }
  }

  uploadAvatar(file: File): Observable<string> {
    const filePath = `avatars/${new Date().getTime()}_${file.name}`;
    return from(
      this.supabaseService
        .getClient()
        .storage.from('avatars')
        .upload(filePath, file)
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
