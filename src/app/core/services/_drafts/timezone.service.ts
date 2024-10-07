import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './../../services/user.service';
import { ToastService } from './../../services/toast.service';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private currentTimezone = new BehaviorSubject<string>('UTC');
  private snackBarRef: MatSnackBarRef<TextOnlySnackBar> | null = null;

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
          this.checkTimezoneDiscrepancy(settings.timezone);
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
    this.currentTimezone.next(this.getFallbackTimezone(localTimezone));
  }

  formatToUserTimezone(date: Date): string {
    return date.toLocaleString('en-US', { timeZone: this.currentTimezone.value });
  }

  private checkTimezoneDiscrepancy(storedTimezone: string): void {
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (browserTimezone !== storedTimezone) {
      this.showTimezoneDiscrepancyToast(browserTimezone);
    }
  }

  private showTimezoneDiscrepancyToast(newTimezone: string): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
    this.snackBarRef = this.toastService.showTimezoneDiscrepancy(
      `Your timezone has changed to ${newTimezone}. Would you like to update your settings?`,
      'top',
      'right'
    );
    this.snackBarRef.onAction().subscribe(() => {
      this.setTimezone(this.getFallbackTimezone(newTimezone));
    });
  }

  getFallbackTimezone(timezone: string): string {
    const availableTimezones = [
      'America/New_York', 'America/Chicago', 'America/Denver', 'America/Phoenix',
      'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu',
      'America/Indiana/Indianapolis', 'America/Indiana/Tell_City', 'America/Puerto_Rico',
      'America/St_Johns', 'America/Halifax', 'America/Toronto', 'America/Winnipeg',
      'America/Edmonton', 'America/Vancouver', 'Europe/Dublin', 'Europe/London', 'UTC'
    ];

    if (availableTimezones.includes(timezone)) {
      return timezone;
    }

    // Fallback logic: You might want to implement a more sophisticated mapping here
    if (timezone.startsWith('America/')) return 'America/New_York';
    if (timezone.startsWith('Europe/')) return 'Europe/London';
    return 'UTC';
  }
}
