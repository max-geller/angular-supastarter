import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'teams',
    loadChildren: () =>
      import('./pages/teams/teams.routes').then((m) => m.routes),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./pages/notifications/notifications.page').then(
        (m) => m.NotificationsPage
      ),
  },
    { path: 'billing', loadComponent: () => import('./pages/billing/billing.page').then((m) => m.BillingPage) },
];
