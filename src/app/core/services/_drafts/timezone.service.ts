import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { ToastService } from './../../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private currentTimezone = new BehaviorSubject<string>('UTC');

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) {}

  getCurrentTimezone(): Observable<string> {
    return this.currentTimezone.asObservable();
  }

  async setTimezone(timezone: string): Promise<void> {
    const userId = this.userService.getCurrentUserId();
    if (!userId) {
      console.error('No user logged in');
      this.toastService.showToast('Failed to update timezone: No user logged in');
      return;
    }

    try {
      await this.userService.updateUserSettings(userId, { timezone }).toPromise();
      this.currentTimezone.next(timezone);
      this.toastService.showToast('Timezone updated successfully');
    } catch (error) {
      console.error('Error updating timezone:', error);
      this.toastService.showToast('Failed to update timezone');
    }
  }

  async loadUserTimezone(): Promise<void> {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      try {
        const settings = await this.userService.getUserSettingsById(userId).toPromise();
        if (settings && settings.timezone) {
          this.currentTimezone.next(settings.timezone);
        } else {
          this.setDefaultTimezone();
        }
      } catch (error) {
        console.error('Error loading user timezone:', error);
        this.setDefaultTimezone();
      }
    } else {
      this.setDefaultTimezone();
    }
  }

  private setDefaultTimezone(): void {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    this.currentTimezone.next(localTimezone);
  }

  formatToUserTimezone(date: Date): string {
    return date.toLocaleString('en-US', { timeZone: this.currentTimezone.value });
  }
}
