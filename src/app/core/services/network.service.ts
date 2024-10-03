import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

declare global {
  interface Navigator {
    connection?: NetworkInformation;
  }

  interface NetworkInformation extends EventTarget {
    readonly downlink: number;
    readonly downlinkMax: number;
    readonly effectiveType: string;
    readonly rtt: number;
    readonly saveData: boolean;
    readonly type: string;
    onchange?: ((this: NetworkInformation, ev: Event) => any) | null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  private online$: Observable<boolean>;
  private connectionQuality$: BehaviorSubject<string>;
  private connectionType$: BehaviorSubject<string>;
  private networkSpeed$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private toastService: ToastService) {
    this.online$ = merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false))
    );

    this.connectionQuality$ = new BehaviorSubject<string>(this.getInitialConnectionQuality());
    this.connectionType$ = new BehaviorSubject<string>(this.getConnectionType());

    this.initializeNetworkMonitoring();
  }

  private initializeNetworkMonitoring(): void {
    this.monitorOnlineStatus();
    this.monitorNetworkQualityChange();
    this.monitorConnectionTypeChange();
    this.updateNetworkSpeed();
  }

  private monitorOnlineStatus(): void {
    this.online$.subscribe((isOnline) => {
      if (isOnline) {
        this.toastService.showToast('You are back online', 8000, 'bottom', 'center');
      } else {
        this.toastService.showToast('You are offline. Some features may be unavailable.', 3000, 'bottom', 'center');
      }
    });
  }

  private monitorNetworkQualityChange(): void {
    if ('connection' in navigator && 'onchange' in navigator.connection!) {
      navigator.connection!.onchange = () => {
        const newQuality = this.getConnectionQuality();
        const oldQuality = this.connectionQuality$.getValue();
        
        if (newQuality !== oldQuality) {
          this.connectionQuality$.next(newQuality);
          this.toastService.showToast(`${newQuality}`, 3000, 'bottom', 'center');
        }
      };
    }
  }

  private monitorConnectionTypeChange(): void {
    if ('connection' in navigator && 'onchange' in navigator.connection!) {
      navigator.connection!.onchange = () => {
        const newType = this.getConnectionType();
        this.connectionType$.next(newType);
        this.updateNetworkSpeed();
      };
    }
  }

  private updateNetworkSpeed(): void {
    if ('connection' in navigator && 'downlink' in navigator.connection!) {
      this.networkSpeed$.next(navigator.connection.downlink);
    }
  }

  private getInitialConnectionQuality(): string {
    return this.getConnectionQuality();
  }

  private getConnectionQuality(): string {
    if ('connection' in navigator) {
      const conn = navigator.connection!;
      if (conn.effectiveType === '4g') return 'Network Fully Restored';
      if (conn.effectiveType === '3g') return 'Network Is Degraded';
      if (conn.effectiveType === '2g') return 'Network Is Poor. Please Save Your Work!';
      return 'Unknown';
    }
    return 'Unknown';
  }

  private getEffectiveConnectionType(): string {
    if ('connection' in navigator && navigator.connection) {
      return navigator.connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  private getConnectionType(): string {
    if ('connection' in navigator && navigator.connection) {
      const type = navigator.connection.type || 'unknown';
      const effectiveType = this.getEffectiveConnectionType();
      return `${type} (${effectiveType})`;
    }
    return 'unknown';
  }

  getOnlineStatus(): Observable<boolean> {
    return this.online$;
  }

  getConnectionQualityObservable(): Observable<string> {
    return this.connectionQuality$.asObservable();
  }

  getConnectionTypeObservable(): Observable<string> {
    return this.connectionType$.asObservable();
  }

  getNetworkSpeedObservable(): Observable<number> {
    return this.networkSpeed$.asObservable();
  }
}
